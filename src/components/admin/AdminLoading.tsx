import AdminShell from './AdminShell';

export default function AdminLoading() {
  return (
    <AdminShell>
      <div className="flex items-center justify-center py-24">
        <div className="text-sm text-white/30">Loading...</div>
      </div>
    </AdminShell>
  );
}
