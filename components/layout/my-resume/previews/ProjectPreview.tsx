import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const ProjectsPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />

      {formData?.projects?.map((project: any, index: number) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: formData?.themeColor || themeColors[0],
            }}
          >
            {project?.projectName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {project?.technologies && `Technologies: ${project?.technologies}`}
            <span>
              {project?.startDate}
              {project?.startDate &&
                (project?.endDate || project?.endDate === "") &&
                " to "}
              {project?.startDate && project?.endDate == ""
                ? "Present"
                : project.endDate}
            </span>
          </h2>
          {project?.projectUrl && (
            <p className="text-xs italic">
              Project URL: {project?.projectUrl}
            </p>
          )}
          {project?.description && (
            <div
              className="text-xs my-2 form-preview"
              dangerouslySetInnerHTML={{
                __html: project?.description,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectsPreview;