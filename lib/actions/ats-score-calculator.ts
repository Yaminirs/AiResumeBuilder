export function calculateATSScore(formData: any, keywords: string[]) {
    let score = 0;
    const missingSections: string[] = [];
  
    // Null checks and default empty arrays/strings
    const skills = Array.isArray(formData.skills) ? formData.skills : [];
    const projects = Array.isArray(formData.projects) ? formData.projects : [];
    const experience = Array.isArray(formData.experience) ? formData.experience : [];
    const education = Array.isArray(formData.education) ? formData.education : [];
  
    // Scoring logic with feedback
    if (formData.firstName && formData.lastName) score += 5;
    else missingSections.push("Name");
  
    if (formData.jobTitle) score += 5;
    else missingSections.push("Job Title");
  
    if (formData.address && formData.phone && formData.email) score += 5;
    else missingSections.push("Contact Information");
  
    if (formData.summary) score += 10;
    else missingSections.push("Summary");
  
    if (experience.length > 0) score += 10;
    else missingSections.push("Experience");
  
    if (education.length > 0) score += 5;
    else missingSections.push("Education");
  
    if (projects.length > 0) score += 10;
    else missingSections.push("Projects");
  
    if (skills.length > 0) score += 10;
    else missingSections.push("Skills");
  
    // Keyword matching with null-safe operations
    const keywordMatches = keywords.filter((keyword) =>
      [
        formData.jobTitle || '',
        ...skills.map((skill: any) => skill.skillName || ''),
        ...projects.map((project: any) => project.projectName || ''),
        ...projects.map((project: any) => project.technologies || ''),
        formData.summary || ''
      ].some((item) => 
        typeof item === 'string' && 
        item.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    score += keywordMatches.length * 2;
  
    return {
      score: Math.min(100, score), 
      feedback: missingSections.length
        ? `Missing sections: ${missingSections.join(", ")}`
        : "Great job! Your resume is complete.",
    };
}