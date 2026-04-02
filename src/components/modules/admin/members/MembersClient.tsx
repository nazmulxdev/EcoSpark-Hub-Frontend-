"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Users,
  Search,
  X,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
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
import { changeMemberStatus } from "@/actions/client/admin.client";
import { MemberStatus } from "@/types/enums";

interface Member {
  id: string;
  status: MemberStatus;
  isActive: boolean;
  joinedAt: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    userStatus: string;
  };
  membershipPayment: {
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  } | null;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MembersClientProps {
  initialMembers: Member[];
  initialMeta: Meta;
  currentPage: number;
  currentLimit: number;
  currentSearchTerm: string;
  currentStatus: string;
}

export function MembersClient({
  initialMembers,
  initialMeta,
  currentSearchTerm,
  currentStatus,
}: MembersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [meta, setMeta] = useState<Meta>(initialMeta);
  const [search, setSearch] = useState(currentSearchTerm);
  const [statusFilter, setStatusFilter] = useState(currentStatus);
  const [showFilters, setShowFilters] = useState(false);
  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);

  useEffect(() => {
    setMembers(initialMembers);
    setMeta(initialMeta);
  }, [initialMembers, initialMeta]);

  useEffect(() => {
    setSearch(currentSearchTerm);
    setStatusFilter(currentStatus);
  }, [currentSearchTerm, currentStatus]);

  const updateUrl = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();
    if (params.searchTerm && params.searchTerm !== "")
      urlParams.set("searchTerm", String(params.searchTerm));
    if (params.status && params.status !== "")
      urlParams.set("status", String(params.status));
    if (params.page && Number(params.page) > 1)
      urlParams.set("page", String(params.page));

    const newUrl = `${pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
    startTransition(() => router.push(newUrl));
  };

  const handleSearch = () => {
    updateUrl({ searchTerm: search, status: statusFilter, page: 1 });
  };

  const clearSearch = () => {
    setSearch("");
    updateUrl({ searchTerm: "", status: statusFilter, page: 1 });
  };

  const handleStatusChange = (val: string) => {
    const newStatus = val === "all" ? "" : val;
    setStatusFilter(newStatus);
    updateUrl({ searchTerm: search, status: newStatus, page: 1 });
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setShowFilters(false);
    updateUrl({ searchTerm: "", status: "", page: 1 });
  };

  const goToPage = (page: number) => {
    updateUrl({ searchTerm: search, status: statusFilter, page });
  };

  const handleApproveMember = async (member: Member) => {
    setUpdatingMemberId(member.id);
    const toastId = toast.loading("Approving member application...");

    try {
      const result = await changeMemberStatus(member.id, {
        status: MemberStatus.APPROVED,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to approve member", {
          id: toastId,
        });
        return;
      }

      toast.success("Member approved successfully!", { id: toastId });
      setMembers(
        members.map((m) =>
          m.id === member.id
            ? {
                ...m,
                status: MemberStatus.APPROVED,
                isActive: true,
                joinedAt: new Date().toISOString(),
              }
            : m,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const handleRejectMember = async (member: Member) => {
    setUpdatingMemberId(member.id);
    const toastId = toast.loading("Rejecting member application...");

    try {
      const result = await changeMemberStatus(member.id, {
        status: MemberStatus.REJECTED,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to reject member", {
          id: toastId,
        });
        return;
      }

      toast.success("Member rejected successfully!", { id: toastId });
      setMembers(
        members.map((m) =>
          m.id === member.id
            ? { ...m, status: MemberStatus.REJECTED, isActive: false }
            : m,
        ),
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const hasFilters = currentSearchTerm || currentStatus;
  const pendingCount = members.filter(
    (m) => m.status === MemberStatus.PENDING,
  ).length;
  const approvedCount = members.filter(
    (m) => m.status === MemberStatus.APPROVED,
  ).length;
  const rejectedCount = members.filter(
    (m) => m.status === MemberStatus.REJECTED,
  ).length;
  const totalRevenue = members.reduce(
    (sum, m) => sum + (Number(m.membershipPayment?.amount) || 0),
    0,
  );

  const getStatusBadge = (status: MemberStatus) => {
    switch (status) {
      case MemberStatus.APPROVED:
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
      case MemberStatus.REJECTED:
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400";
    }
  };

  const getStatusIcon = (status: MemberStatus) => {
    switch (status) {
      case MemberStatus.APPROVED:
        return <CheckCircle className="w-3 h-3" />;
      case MemberStatus.REJECTED:
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Member Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Review member applications and manage existing members
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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
              Total Members
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Pending
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {approvedCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Approved
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalRevenue}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Total Revenue
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
                      <SelectItem value={MemberStatus.PENDING}>
                        Pending
                      </SelectItem>
                      <SelectItem value={MemberStatus.APPROVED}>
                        Approved
                      </SelectItem>
                      <SelectItem value={MemberStatus.REJECTED}>
                        Rejected
                      </SelectItem>
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
            of <span className="font-medium">{meta.total}</span> members
          </p>
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
          )}
        </div>

        {/* Members Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-medium">
                          {member.user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {member.user.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusBadge(member.status)}>
                        {getStatusIcon(member.status)}
                        <span className="ml-1">{member.status}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {member.membershipPayment ? (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${member.membershipPayment.amount}{" "}
                            {member.membershipPayment.currency}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.membershipPayment.status}
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No payment
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(member.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {member.joinedAt
                        ? formatDistanceToNow(new Date(member.joinedAt), {
                            addSuffix: true,
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {member.status === MemberStatus.PENDING && (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveMember(member)}
                            disabled={updatingMemberId === member.id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {updatingMemberId === member.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" /> Approve
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectMember(member)}
                            disabled={updatingMemberId === member.id}
                          >
                            {updatingMemberId === member.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" /> Reject
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                      {member.status !== MemberStatus.PENDING && (
                        <Badge variant="outline">
                          {member.status === MemberStatus.APPROVED
                            ? "Approved"
                            : "Rejected"}
                        </Badge>
                      )}
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
