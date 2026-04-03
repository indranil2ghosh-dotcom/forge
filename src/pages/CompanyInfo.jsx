import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
import { setCompanyData, selectUserData, selectOrganizationType } from '@/features/auth/authSlice';
import { RefreshCw } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import { Button } from '@/components/ui/button';

import ConfirmCompanyModal from '../components/company/ConfirmCompanyModal';
import BasicInfoSection from '../components/company/BasicInfoSection';
import ClassificationSection from '../components/company/ClassificationSection';
import ProgramsSection from '../components/company/ProgramsSection';
import MaterialsUploadSection from '../components/company/MaterialsUploadSection';
import SocialMediaSection from '../components/company/SocialMediaSection';

export default function CompanyInfo() {
  const dispatch = useDispatch();
  const location = useLocation(); // 2. Initialize useLocation
  
  const userData = useSelector(selectUserData);
  const organizationType = useSelector(selectOrganizationType);

  // 3. Extract the search data passed from FindCompany
  const passedData = location.state || {};

  // 4. Dynamically set the initial state based on what they searched!
  const INITIAL_FORM_STATE = {
    companyName: passedData.searchMethod === 'companyName' ? passedData.searchValue : '',
    website: '', 
    ueid: passedData.searchMethod === 'ueid' ? passedData.searchValue : '', 
    cageCode: passedData.searchMethod === 'cage' ? passedData.searchValue : '', 
    ein: '', founder: '', foundedYear: '', stateReg: '', regCode: '', state: '', 
    address: '', city: '', zip: '', classification: '', programs: [],
    linkedin: '', facebook: '', youtube: '', instagram: ''
  };

  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // 5. New state to track if SAM Data was clicked
  const [isSamDataLocked, setIsSamDataLocked] = useState(false);

  const handleRefreshSamData = () => {
    setForm((prev) => ({
      ...prev,
      companyName: 'Cencore LLC', website: 'http://www.cencoregroup.com',
      ueid: 'JSJFI0MLSP', cageCode: '82939', ein: '92-883894',
      founder: 'Adam Fife', foundedYear: '2010', stateReg: 'UT',
      state: 'UT', address: '59 W 900 N', city: 'Springville', zip: '84663',
    }));
    // 6. Lock the fields when SAM data populates!
    setIsSamDataLocked(true); 
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    // 7. Unlock the fields if they hit reset
    setIsSamDataLocked(false);
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmModal(false);
    dispatch(setCompanyData(form));

    const completeOnboardingPayload = {
      userDetails: userData,            
      isRegisteredWithSam: organizationType, 
      companyDetails: form              
    };
    console.log("Onboarding Complete! Final JSON Payload:");
    console.log(JSON.stringify(completeOnboardingPayload, null, 2));
  };

  return (
    <AuthLayout showBack={true}>
      <ConfirmCompanyModal 
        isOpen={showConfirmModal} 
        setIsOpen={setShowConfirmModal} 
        form={form} 
        onConfirm={handleFinalConfirm} 
      />

      <div className="flex flex-col justify-center min-h-[calc(100vh-10rem)] w-full max-w-3xl mx-auto pt-4 pb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">About your company</h1>
          <button 
            type="button" 
            onClick={handleReset}
            className="text-iwePrimary hover:text-iwePrimaryHover text-base flex items-center gap-2 hover:underline font-semibold transition-colors"
          >
            <RefreshCw className="w-5 h-5" /> Reset Form
          </button>
        </div>

        <form className="space-y-12" onSubmit={handleInitialSubmit}>
          
          {/* 8. Pass the lock state down into your BasicInfoSection */}
          <BasicInfoSection 
            form={form} 
            setForm={setForm} 
            onRefreshSamData={handleRefreshSamData} 
            isSamDataLocked={isSamDataLocked} 
          />
          
          <hr className="border-gray-200" />
          <ClassificationSection form={form} setForm={setForm} />
          <ProgramsSection form={form} setForm={setForm} />
          <MaterialsUploadSection />
          <hr className="border-gray-200" />
          <SocialMediaSection form={form} setForm={setForm} />

          <div className="pt-4">
            <Button type="submit" className="w-full sm:w-48 bg-iwePrimary hover:bg-iwePrimaryHover text-white h-14 text-lg font-bold transition-all shadow-sm">
              Continue
            </Button>
          </div>
          
        </form>
      </div>
    </AuthLayout>
  );
}