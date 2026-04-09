import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Mail, FileText, Calendar, User, Star } from 'lucide-react';

interface CastingApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  breastSize?: string;
  experience: string;
  experienceDesc?: string;
  platforms?: string;
  contentTypes?: string;
  limits?: string;
  sessionsPerWeek?: string;
  workingTimes?: string;
  motivation: string;
  bodyModifications?: string;
  skills?: string;
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  consentMarketing: boolean;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  video?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface CastingManagerProps {
  token: string;
}

const CastingManager: React.FC<CastingManagerProps> = ({ token }) => {
  const [applications, setApplications] = useState<CastingApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<CastingApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<CastingApplication | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/casting', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/casting/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchApplications();
        
        // Send automated email
        await sendDecisionEmail(applicationId, newStatus);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const sendDecisionEmail = async (applicationId: string, decision: string) => {
    setSendingEmail(true);
    try {
      const response = await fetch('/api/admin/casting/send-email', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          applicationId,
          decision,
          template: decision === 'approved' ? 'approval' : decision === 'rejected' ? 'rejection' : 'review'
        })
      });

      if (response.ok) {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
    setSendingEmail(false);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Experience', 'Applied Date'];
    const csvData = filteredApplications.map(app => [
      `${app.firstName} ${app.lastName}`,
      app.email,
      app.phone,
      app.status,
      app.experience,
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'casting-applications.csv';
    a.click();
  };

  const exportToPDF = () => {
    // This would typically use a library like jsPDF
    alert('PDF export functionality would be implemented with a PDF library');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10';
      case 'rejected': return 'text-red-400 bg-red-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Casting Applications</h2>
          <p className="text-gray-400">Review and manage new model applications</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: applications.length, icon: User, color: 'from-blue-500 to-blue-600' },
          { label: 'Pending Review', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, icon: XCircle, color: 'from-red-500 to-red-600' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-white/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applied</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredApplications.map((application) => (
                <motion.tr
                  key={application.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold">
                        {application.firstName.charAt(0)}{application.lastName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {application.firstName} {application.lastName}
                        </div>
                        <div className="text-sm text-gray-400">
                          Age: {calculateAge(application.birthDate)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{application.email}</div>
                    <div className="text-sm text-gray-400">{application.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {application.height && <div>Height: {application.height}cm</div>}
                      {application.weight && <div>Weight: {application.weight}kg</div>}
                      {application.hairColor && <div>Hair: {application.hairColor}</div>}
                      {application.eyeColor && <div>Eyes: {application.eyeColor}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      application.experience === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      <Star className="w-3 h-3" />
                      {application.experience === 'yes' ? 'Experienced' : 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application.id, 'approved')}
                            className="text-green-400 hover:text-green-300"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'rejected')}
                            className="text-red-400 hover:text-red-300"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Application Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Personal Information</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">First Name</label>
                      <p className="text-white">{selectedApplication.firstName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Last Name</label>
                      <p className="text-white">{selectedApplication.lastName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Email</label>
                      <p className="text-white">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Phone</label>
                      <p className="text-white">{selectedApplication.phone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Birth Date</label>
                      <p className="text-white">{new Date(selectedApplication.birthDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Age</label>
                      <p className="text-white">{calculateAge(selectedApplication.birthDate)} years</p>
                    </div>
                  </div>
                </div>

                {/* Physical Details */}
                <h4 className="text-lg font-semibold text-white">Physical Details</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Height</label>
                      <p className="text-white">{selectedApplication.height || 'Not specified'} cm</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Weight</label>
                      <p className="text-white">{selectedApplication.weight || 'Not specified'} kg</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Hair Color</label>
                      <p className="text-white">{selectedApplication.hairColor || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Eye Color</label>
                      <p className="text-white">{selectedApplication.eyeColor || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Breast Size</label>
                      <p className="text-white">{selectedApplication.breastSize || 'Not specified'}</p>
                    </div>
                  </div>
                  {selectedApplication.bodyModifications && (
                    <div>
                      <label className="text-xs text-gray-400">Body Modifications</label>
                      <p className="text-white">{selectedApplication.bodyModifications}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Professional Information</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-400">Experience</label>
                    <p className="text-white">{selectedApplication.experience === 'yes' ? 'Experienced' : 'New to industry'}</p>
                  </div>
                  {selectedApplication.experienceDesc && (
                    <div>
                      <label className="text-xs text-gray-400">Experience Description</label>
                      <p className="text-white">{selectedApplication.experienceDesc}</p>
                    </div>
                  )}
                  {selectedApplication.skills && (
                    <div>
                      <label className="text-xs text-gray-400">Skills</label>
                      <p className="text-white">{selectedApplication.skills}</p>
                    </div>
                  )}
                  {selectedApplication.platforms && (
                    <div>
                      <label className="text-xs text-gray-400">Platforms</label>
                      <p className="text-white">{selectedApplication.platforms}</p>
                    </div>
                  )}
                  {selectedApplication.contentTypes && (
                    <div>
                      <label className="text-xs text-gray-400">Content Types</label>
                      <p className="text-white">{selectedApplication.contentTypes}</p>
                    </div>
                  )}
                  {selectedApplication.limits && (
                    <div>
                      <label className="text-xs text-gray-400">Limits/Boundaries</label>
                      <p className="text-white">{selectedApplication.limits}</p>
                    </div>
                  )}
                  {selectedApplication.sessionsPerWeek && (
                    <div>
                      <label className="text-xs text-gray-400">Sessions Per Week</label>
                      <p className="text-white">{selectedApplication.sessionsPerWeek}</p>
                    </div>
                  )}
                  {selectedApplication.workingTimes && (
                    <div>
                      <label className="text-xs text-gray-400">Working Times</label>
                      <p className="text-white">{selectedApplication.workingTimes}</p>
                    </div>
                  )}
                </div>

                {/* Motivation */}
                <h4 className="text-lg font-semibold text-white">Motivation</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white">{selectedApplication.motivation}</p>
                </div>
              </div>
            </div>

            {/* Media Files */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Media Files</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedApplication.photo1 && (
                  <div className="bg-gray-800 rounded-lg p-2">
                    <img src={selectedApplication.photo1} alt="Photo 1" className="w-full h-32 object-cover rounded" />
                    <p className="text-xs text-gray-400 mt-2 text-center">Photo 1</p>
                  </div>
                )}
                {selectedApplication.photo2 && (
                  <div className="bg-gray-800 rounded-lg p-2">
                    <img src={selectedApplication.photo2} alt="Photo 2" className="w-full h-32 object-cover rounded" />
                    <p className="text-xs text-gray-400 mt-2 text-center">Photo 2</p>
                  </div>
                )}
                {selectedApplication.photo3 && (
                  <div className="bg-gray-800 rounded-lg p-2">
                    <img src={selectedApplication.photo3} alt="Photo 3" className="w-full h-32 object-cover rounded" />
                    <p className="text-xs text-gray-400 mt-2 text-center">Photo 3</p>
                  </div>
                )}
                {selectedApplication.video && (
                  <div className="bg-gray-800 rounded-lg p-2">
                    <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Video</p>
                  </div>
                )}
              </div>
            </div>

            {/* Consents */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Consents</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-3 rounded-lg text-center ${selectedApplication.consentAge ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Age Verification</p>
                </div>
                <div className={`p-3 rounded-lg text-center ${selectedApplication.consentTerms ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Terms & Conditions</p>
                </div>
                <div className={`p-3 rounded-lg text-center ${selectedApplication.consentData ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Data Processing</p>
                </div>
                <div className={`p-3 rounded-lg text-center ${selectedApplication.consentMarketing ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Marketing</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedApplication.status === 'pending' && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'approved');
                    setShowModal(false);
                  }}
                  disabled={sendingEmail}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {sendingEmail ? 'Sending Email...' : 'Approve & Send Email'}
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'rejected');
                    setShowModal(false);
                  }}
                  disabled={sendingEmail}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  {sendingEmail ? 'Sending Email...' : 'Reject & Send Email'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CastingManager;
