import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Panel - Studio HRL Adult',
  description: 'Admin panel for Studio HRL Adult management system',
};

export default function AdminPage() {
  // This is a wrapper page - the actual admin logic is in AdminDashboard component
  // The authentication and token management should be handled in the AdminDashboard
  return <AdminDashboard token="" />;
}
