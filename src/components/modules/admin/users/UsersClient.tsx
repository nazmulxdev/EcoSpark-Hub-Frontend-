"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Users,
  Search,
  X,
  UserCheck,
  UserX,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { changeUserStatus } from "@/actions/client/admin.client";
import { UserStatus, Role } from "@/types/enums";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  userStatus: UserStatus;
  createdAt: string;
  member?: {
    id: string;
    status: string;
    joinedAt: string | null;
  } | null;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UsersClientProps {
  initialUsers: User[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
  currentStatus: string;
  currentRole: string;
}

export function UsersClient({
  initialUsers,
  initialMeta,
  currentSearchTerm,
  currentStatus,
  currentRole,
}: UsersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [search, setSearch] = useState(currentSearchTerm);
  const [statusFilter, setStatusFilter] = useState(currentStatus);
  const [roleFilter, setRoleFilter] = useState(currentRole);
  const [showFilters, setShowFilters] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    setUsers(initialUsers);
    setMeta(initialMeta);
  }, [initialUsers, initialMeta]);

  useEffect(() => {
    setSearch(currentSearchTerm);
    setStatusFilter(currentStatus);
    setRoleFilter(currentRole);
  }, [currentSearchTerm, currentStatus, currentRole]);

  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();
    if (params.searchTerm && params.searchTerm !== "")
      urlParams.set("searchTerm", String(params.searchTerm));
    if (params.status && params.status !== "")
      urlParams.set("status", String(params.status));
    if (params.role && params.role !== "")
      urlParams.set("role", String(params.role));
    if (params.page && Number(params.page) > 1)
      urlParams.set("page", String(params.page));

    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl));
  };

  const handleSearch = () => {
    updateUrl({
      searchTerm: search,
      status: statusFilter,
      role: roleFilter,
      page: 1,
    });
  };

  const clearSearch = () => {
    setSearch("");
    updateUrl({
      searchTerm: "",
      status: statusFilter,
      role: roleFilter,
      page: 1,
    });
  };

  const handleStatusChange = (val: string) => {
    const newStatus = val === "all" ? "" : val;
    setStatusFilter(newStatus);
    updateUrl({
      searchTerm: search,
      status: newStatus,
      role: roleFilter,
      page: 1,
    });
  };

  const handleRoleChange = (val: string) => {
    const newRole = val === "all" ? "" : val;
    setRoleFilter(newRole);
    updateUrl({
      searchTerm: search,
      status: statusFilter,
      role: newRole,
      page: 1,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setRoleFilter("");
    setShowFilters(false);
    updateUrl({ searchTerm: "", status: "", role: "", page: 1 });
  };

  const goToPage = (page: number) => {
    updateUrl({
      searchTerm: search,
      status: statusFilter,
      role: roleFilter,
      page,
    });
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus =
      user.userStatus === UserStatus.ACTIVE
        ? UserStatus.BANNED
        : UserStatus.ACTIVE;
    setUpdatingUserId(user.id);
    const toastId = toast.loading(
      `${newStatus === UserStatus.ACTIVE ? "Activating" : "Banning"} user...`,
    );

    try {
      const result = await changeUserStatus(user.id, { userStatus: newStatus });

      if (result.error) {
        toast.error(result.error.message || "Failed to update user status", {
          id: toastId,
        });
        return;
      }

      toast.success(
        `User ${newStatus === UserStatus.ACTIVE ? "activated" : "banned"} successfully`,
        { id: toastId },
      );
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, userStatus: newStatus } : u,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const hasFilters = currentSearchTerm || currentStatus || currentRole;
  const activeCount = users.filter(
    (u) => u.userStatus === UserStatus.ACTIVE,
  ).length;
  const bannedCount = users.filter(
    (u) => u.userStatus === UserStatus.BANNED,
  ).length;

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400";
      case Role.MEMBER:
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      case UserStatus.BANNED:
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage platform users, view their activity, and moderate accounts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {meta.total}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Users
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Active Users
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <UserX className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {bannedCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Banned Users
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm mb-6 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9 pr-9 h-11"
                />
                {search && (
                  <Button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  disabled={isPending}
                  className="h-11 px-6 bg-green-600 hover:bg-green-700"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-11 gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </Button>
                {hasFilters && (
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="h-11 gap-2 text-red-500 hover:text-red-600"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="px-4 py-5 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Status
                  </label>
                  <Select
                    value={statusFilter || "all"}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                      <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Role
                  </label>
                  <Select
                    value={roleFilter || "all"}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="w-full h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value={Role.USER}>User</SelectItem>
                      <SelectItem value={Role.MEMBER}>Member</SelectItem>
                      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800/20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {currentSearchTerm && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm">
                    Search: {currentSearchTerm}
                    <button
                      onClick={clearSearch}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {currentStatus && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm">
                    Status: {currentStatus}
                    <button
                      onClick={() => handleStatusChange("all")}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {currentRole && (
                  <Badge className="gap-1 px-3 py-1.5 text-sm">
                    Role: {currentRole}
                    <button
                      onClick={() => handleRoleChange("all")}
                      className="ml-1.5 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="font-medium">{meta.total}</span> users
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-medium">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusBadge(user.userStatus)}>
                        {user.userStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {user.member ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          Member since{" "}
                          {user.member.joinedAt
                            ? formatDistanceToNow(
                                new Date(user.member.joinedAt),
                                { addSuffix: true },
                              )
                            : "N/A"}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Not a member
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.role !== Role.ADMIN && (
                          <Button
                            variant={
                              user.userStatus === UserStatus.ACTIVE
                                ? "destructive"
                                : "default"
                            }
                            size="sm"
                            onClick={() => handleToggleStatus(user)}
                            disabled={updatingUserId === user.id}
                            className={
                              user.userStatus === UserStatus.ACTIVE
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                            }
                          >
                            {updatingUserId === user.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : user.userStatus === UserStatus.ACTIVE ? (
                              <>
                                <UserX className="w-3 h-3 mr-1" /> Ban
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3 h-3 mr-1" /> Activate
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2">
            <p className="text-sm text-gray-500">
              Page {meta.page} of {meta.totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1 || isPending}
                onClick={() => goToPage(meta.page - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === meta.totalPages || isPending}
                onClick={() => goToPage(meta.page + 1)}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
