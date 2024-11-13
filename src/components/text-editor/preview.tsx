import React from "react";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div
      className="preview"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Preview;