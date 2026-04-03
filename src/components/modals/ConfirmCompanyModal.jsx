import React from 'react';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export default function ConfirmCompanyModal({ isOpen, setIsOpen, form, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-white p-8 sm:p-10 border-gray-200 rounded-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold text-gray-900">Confirm your company</DialogTitle>
          <DialogDescription className="text-base text-gray-500 mt-3">
            Please confirm this is the correct company you're associated with.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          <div>
            <p className="text-base font-medium text-gray-500 mb-1">Your Company:</p>
            <p className="font-bold text-2xl text-gray-900">{form.companyName || "Not Provided"}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500 mb-1">Company Address:</p>
            <p className="font-bold text-xl text-gray-900 leading-relaxed">
              {form.address || "No Address Provided"}<br />
              {form.city}{form.city && form.state ? ', ' : ''}{form.state} {form.zip}
            </p>
          </div>
        </div>
        
        <DialogFooter className="mt-10 flex gap-4 sm:justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            className="border-gray-300 text-gray-700 h-14 px-8 text-lg font-bold hover:bg-gray-50 w-full sm:w-auto transition-all"
          >
            Go back
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm} 
            className="bg-iwePrimary hover:bg-iwePrimaryHover text-white h-14 px-8 text-lg font-bold w-full sm:w-auto transition-all shadow-sm"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}