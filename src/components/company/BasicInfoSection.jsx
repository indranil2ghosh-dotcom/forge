import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function BasicInfoSection({ form, setForm, onRefreshSamData, isSamDataLocked }) {
  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const lockableInputClass = "h-14 px-4 text-base md:text-base border-gray-300 focus-visible:ring-iwePrimary transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed";
  
  const standardInputClass = "h-14 px-4 text-base md:text-base border-gray-300 focus-visible:ring-iwePrimary transition-all";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
      
      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Company Name *</Label>
        <Input 
          disabled={isSamDataLocked} 
          value={form.companyName} 
          onChange={(e) => handleChange('companyName', e.target.value)} 
          className={lockableInputClass} 
          required 
        />
        {isSamDataLocked && (
          <p className="text-xs font-medium text-gray-400">This data cannot be changed as it came from SAM.gov</p>
        )}
      </div>
      
      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Company Website *</Label>
        <Input 
          disabled={isSamDataLocked} 
          value={form.website} 
          onChange={(e) => handleChange('website', e.target.value)} 
          className={lockableInputClass} 
          required 
        />
        {isSamDataLocked && (
          <p className="text-xs font-medium text-gray-400">This data cannot be changed as it came from SAM.gov</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Unique Entity ID (UEID) *</Label>
        <Input 
          disabled={isSamDataLocked} 
          value={form.ueid} 
          onChange={(e) => handleChange('ueid', e.target.value)}
          className={lockableInputClass} 
          required 
        />
        {isSamDataLocked && (
          <p className="text-xs font-medium text-gray-400">This data cannot be changed as it came from SAM.gov</p>
        )}
      </div>
      
      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Cage Code *</Label>
        <Input 
          disabled={isSamDataLocked} 
          value={form.cageCode} 
          onChange={(e) => handleChange('cageCode', e.target.value)}
          className={lockableInputClass} 
          required 
        />
        {isSamDataLocked && (
          <p className="text-xs font-medium text-gray-400">This data cannot be changed as it came from SAM.gov</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">EIN/TIN *</Label>
        <Input 
          value={form.ein} 
          onChange={(e) => handleChange('ein', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
      
      <div className="col-span-1 md:col-span-2 flex items-end pt-2">
        <Button 
          type="button" 
          onClick={onRefreshSamData} 
          className="w-full h-14 text-base font-bold bg-iwePrimary hover:bg-iwePrimaryHover text-white flex gap-2 transition-all shadow-sm"
        >
          <RefreshCw className="w-5 h-5" /> Refresh SAM.gov Data
        </Button>
      </div>

      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Founder Name *</Label>
        <Input 
          disabled={isSamDataLocked} 
          value={form.founder} 
          onChange={(e) => handleChange('founder', e.target.value)}
          className={lockableInputClass} 
          required 
        />
        {isSamDataLocked && (
          <p className="text-xs font-medium text-gray-400">This data cannot be changed as it came from SAM.gov</p>
        )}
      </div>
      
      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Year Founded *</Label>
        <Input 
          value={form.foundedYear} 
          onChange={(e) => handleChange('foundedYear', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>

      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">State of Registration *</Label>
        <Input 
          value={form.stateReg} 
          onChange={(e) => handleChange('stateReg', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Registration Code *</Label>
        <Input 
          value={form.regCode} 
          onChange={(e) => handleChange('regCode', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 space-y-3">
        <Label className="text-base font-semibold text-gray-700">State *</Label>
        <Input 
          value={form.state} 
          onChange={(e) => handleChange('state', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>

      <div className="col-span-1 md:col-span-2 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Company Address *</Label>
        <Input 
          value={form.address} 
          onChange={(e) => handleChange('address', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 space-y-3">
        <Label className="text-base font-semibold text-gray-700">City *</Label>
        <Input 
          value={form.city} 
          onChange={(e) => handleChange('city', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 space-y-3">
        <Label className="text-base font-semibold text-gray-700">Zip Code *</Label>
        <Input 
          value={form.zip} 
          onChange={(e) => handleChange('zip', e.target.value)} 
          className={standardInputClass} 
          required 
        />
      </div>
    </div>
  );
}