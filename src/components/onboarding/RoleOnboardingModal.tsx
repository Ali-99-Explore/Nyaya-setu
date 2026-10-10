import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Shield, GraduationCap, Users, Upload, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface RoleOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

export const RoleOnboardingModal: React.FC<RoleOnboardingModalProps> = ({
  isOpen,
  onClose,
  initialRole
}) => {
  const { role, setRole, currentUser, updateCurrentUser, simulatedBarUpload, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || role);

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [district, setDistrict] = useState(currentUser.district || 'Hyderabad');

  // Lawyer specific
  const [barNumber, setBarNumber] = useState(currentUser.barCouncilNumber || 'TS/1420/2011');
  const [uploadedCert, setUploadedCert] = useState<string | null>(
    currentUser.verifiedStatus === 'verified' ? 'Bar_Council_Enrolment_Certificate.pdf' : null
  );

  // Student specific
  const [college, setCollege] = useState(currentUser.college || 'Osmania University College of Law, Hyderabad');
  const [course, setCourse] = useState(currentUser.course || '5-Year B.A. LL.B.');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser.yearOfStudy || '4th Year');
  const [studentId, setStudentId] = useState(currentUser.studentId || 'OU-LAW-2023-088');

  if (!isOpen) return null;

  const handleSimulateCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const fileName = file ? file.name : 'Bar_Council_Certificate_TS_Demo.pdf';
    setUploadedCert(fileName);
    simulatedBarUpload(fileName);
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    if (selectedRole === 'citizen') {
      updateCurrentUser({
        name,
        email,
        phone,
        district
      });
    } else if (selectedRole === 'lawyer') {
      updateCurrentUser({
        name,
        email,
        phone,
        district,
        barCouncilNumber: barNumber,
        verifiedStatus: uploadedCert ? 'pending' : 'unverified'
      });
    } else if (selectedRole === 'student') {
      updateCurrentUser({
        name,
        email,
        phone,
        district,
        college,
        course,
        yearOfStudy,
        studentId
      });
    }

    onClose();
  };

  const telanganaDistricts = [
    'Hyderabad',
    'Medchal-Malkajgiri',
    'Rangareddy',
    'Warangal',
    'Karimnagar',
    'Nizamabad',
    'Khammam',
    'Nalgonda',
    'Sangareddy'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-lg shadow-2xl border border-[#142B4A]/10 overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#142B4A] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#168C88] bg-white/10 px-2 py-0.5 rounded">
              Role Setup & Verification
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Select & Configure Experience
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* 3 Role Selection Cards */}
          <div>
            <label className="block text-xs font-bold text-[#142B4A] mb-2 uppercase tracking-wider">
              Choose Profile Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('citizen')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center text-center transition-all ${
                  selectedRole === 'citizen'
                    ? 'border-[#168C88] bg-white ring-2 ring-[#168C88]/30 shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="p-2 rounded-xl bg-teal-50 text-[#168C88] mb-1.5">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#142B4A]">Citizen</span>
                <span className="text-[9px] text-slate-500 mt-0.5">Explore Rights</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('lawyer')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center text-center transition-all ${
                  selectedRole === 'lawyer'
                    ? 'border-[#D96B27] bg-white ring-2 ring-[#D96B27]/30 shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="p-2 rounded-xl bg-orange-50 text-[#D96B27] mb-1.5">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#142B4A]">Advocate</span>
                <span className="text-[9px] text-slate-500 mt-0.5">Cases & Diary</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3 rounded-2xl border text-left flex flex-col items-center justify-center text-center transition-all ${
                  selectedRole === 'student'
                    ? 'border-[#142B4A] bg-white ring-2 ring-[#142B4A]/30 shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 text-[#142B4A] mb-1.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#142B4A]">Law Student</span>
                <span className="text-[9px] text-slate-500 mt-0.5">Moot & Briefs</span>
              </button>
            </div>
          </div>

          {/* Role specific explanation box */}
          {selectedRole === 'citizen' && (
            <div className="p-3.5 rounded-xl bg-[#168C88]/10 border border-[#168C88]/20 text-xs text-[#142B4A]">
              <div className="flex items-center gap-2 font-bold text-[#168C88]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Open Citizen Access</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-700 leading-relaxed">
                Citizens are <strong>never required to upload identity documents</strong> to read laws, analyze legal notices, or consult legal aid guides.
              </p>
            </div>
          )}

          {selectedRole === 'lawyer' && (
            <div className="p-3.5 rounded-xl bg-[#D96B27]/10 border border-[#D96B27]/20 text-xs text-[#142B4A]">
              <div className="flex items-center gap-2 font-bold text-[#D96B27]">
                <Shield className="w-4 h-4" />
                <span>Simulated Bar Council Verification</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-700 leading-relaxed">
                Advocate registration demonstrates Bar Council of Telangana enrolment verification. Fictional simulation.
              </p>
            </div>
          )}

          {selectedRole === 'student' && (
            <div className="p-3.5 rounded-xl bg-[#142B4A]/5 border border-[#142B4A]/15 text-xs text-[#142B4A]">
              <div className="flex items-center gap-2 font-bold text-[#142B4A]">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Portal Setup</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-700 leading-relaxed">
                Dedicated research syllabus, moot hearing preparation, and case study notes without court causes or client management.
              </p>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSaveAndContinue} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  District (Telangana)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                >
                  {telanganaDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                />
              </div>
            </div>

            {/* Lawyer-specific fields */}
            {selectedRole === 'lawyer' && (
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#142B4A]">
                    Bar Council Credentials
                  </span>
                  <span className="text-[10px] text-[#D96B27] font-semibold">
                    Simulated verification
                  </span>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Bar Enrolment Number (e.g. TS/1420/2011)
                  </label>
                  <input
                    type="text"
                    value={barNumber}
                    onChange={(e) => setBarNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                    placeholder="TS/1234/2020"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    Upload Bar Enrolment Certificate (Simulated)
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-600">
                      {uploadedCert || 'Attach Bar Certificate PDF / Image'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg"
                      onChange={handleSimulateCertUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploadedCert && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#168C88] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Uploaded: {uploadedCert} (Status: Pending Verification)</span>
                  </div>
                )}
              </div>
            )}

            {/* Student-specific fields */}
            {selectedRole === 'student' && (
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-[#142B4A]">
                  Law School & Academic Details
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-1">Course</label>
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-1">Year</label>
                    <input
                      type="text"
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-1">Student ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#142B4A]/10 transition-all mt-4"
            >
              <span>Save & Launch Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
