"use client";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { FormProvider, useFormContext } from "@/lib/context/FormProvider";
import { RWebShare } from "react-web-share";
import React, { useMemo } from "react";
import ResumePreview from "@/components/layout/my-resume/ResumePreview";
import { usePathname } from "next/navigation";
import PageWrapper from "@/components/common/PageWrapper";
import { DownloadIcon, Share2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { calculateATSScore } from "@/lib/actions/ats-score-calculator"; // Adjust import path as needed

// Predefined keywords for ATS score calculation
const DEFAULT_ATS_KEYWORDS = [
  "leadership", "communication", "project management", 
  "team collaboration", "problem-solving", "analytics", 
  "strategic planning", "technical skills"
];

const ATSScoreIndicator = () => {
  const { formData } = useFormContext();

  const atsResult = useMemo(() => {
    return calculateATSScore(formData, DEFAULT_ATS_KEYWORDS);
  }, [formData]);

  return (
    <div className="flex items-center justify-center my-4">
      <div className={`
        p-4 rounded-lg flex items-center gap-3 
        ${atsResult.score >= 70 ? 'bg-green-100' : 'bg-yellow-100'}
      `}>
        {atsResult.score >= 70 ? (
          <CheckCircle2Icon className="text-green-600 size-6" />
        ) : (
          <XCircleIcon className="text-yellow-600 size-6" />
        )}
        <div>
          <p className="font-semibold">
            ATS Score: {atsResult.score}
          </p>
          <p className={`
            text-sm 
            ${atsResult.score >= 70 ? 'text-green-800' : 'text-yellow-800'}
          `}>
            {atsResult.feedback}
          </p>
        </div>
      </div>
    </div>
  );
};

const FinalResumeView = ({
  params,
  isOwnerView,
}: {
  params: { id: string };
  isOwnerView: boolean;
}) => {
  const path = usePathname();
  const { formData } = useFormContext();

  const handleDownload = () => {
    window.print();
  };

  return (
    <PageWrapper>
      <FormProvider params={params}>
        <div id="no-print">
          <Header />
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            {isOwnerView ? (
              <>
                <h2 className="text-center text-2xl font-bold">
                  Congrats! Your ultimate AI-generated resume is ready!
                </h2>
                <ATSScoreIndicator />
                <p className="text-center text-gray-600">
                  You can now download your resume or share its unique URL with
                  your friends and family.
                </p>
                <p className="text-center text-sm text-gray-500 font-light">
                  For better print quality, adjust your browser's print
                  settings: save as PDF, disable headers and footers, set
                  margins to none, and enable background graphics.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-bold">
                  Resume Preview
                </h2>
                <p className="text-center text-gray-600">
                  You are currently viewing a preview of someone else's resume.
                </p>
                <p className="text-center text-sm text-gray-500 font-light">
                  For the ultimate experience, create your own AI-generated
                  resume.
                </p>
              </>
            )}
            <div className="flex max-sm:flex-col justify-center gap-8 my-10">
              <Button
                className="flex px-12 py-6 gap-2 rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-700/30 text-white"
                onClick={handleDownload}
              >
                <DownloadIcon className="size-6" /> Download
              </Button>
              <RWebShare
                data={{
                  text: "Hello everyone, check out my resume by clicking the link!",
                  url: `${process.env.BASE_URL}/${path}`,
                  title: `${formData?.firstName} ${formData?.lastName}'s Resume`,
                }}
                onClick={() => console.log("Shared successfully!")}
              >
                <Button className="flex px-12 py-6 gap-2 rounded-full bg-slate-200 hover:bg-primary-700/20 focus:ring-4 focus:ring-primary-700/30 text-black">
                  <Share2Icon className="size-6" /> Share URL
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="px-10 pt-4 pb-16 max-sm:px-5 max-sm:pb-8 print:p-0">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </FormProvider>
    </PageWrapper>
  );
};

export default FinalResumeView;