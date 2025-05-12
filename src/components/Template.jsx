import { useEffect, useRef } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Template = ({ formData, handleScroll, sectionRef }) => {
  const generatedTemplateRef = useRef(null);
  const subjectRef = useRef(null);

  useEffect(() => {
    if (formData) {
      handleScroll();
    }
  }, [formData, handleScroll]);

  const handleCopy = () => {
    const el = generatedTemplateRef.current;
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      toast.success('Copied to clipboard!');
    }
  };

  const handleCopySubject = () => {
    const el = subjectRef.current;
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <>
      {formData ? (
        <section
          ref={sectionRef}
          className="bg-stone-950 text-white w-full max-sm:px-5 flex flex-col items-center pt-13 pb-20 gap-y-3"
        >
          <div className=" w-1/2 max-lg:w-5/6 max-sm:w-full mx-5 items-start bg-neutral-800 text-white text-lg max-sm:text-sm h-auto px-4 max-sm:pl-4 max-sm:pr-3 py-1 rounded-lg max-sm:rounded-lg tracking-wider">
            <div className="flex gap-x-3 items-center">
              <p ref={subjectRef}>
                Subject: Job Application -{' '}
                {formData.finalJobRole
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}{' '}
                -{' '}
                {formData.fullName
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </p>

              <FaRegCopy
                onClick={handleCopySubject}
                size={25}
                className="cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
              />
            </div>
          </div>
          <div className="leading-5.5 max-sm:leading-5 w-1/2 max-lg:w-5/6 max-sm:w-full mx-5 items-start bg-neutral-800 text-white text-lg max-sm:text-sm h-auto px-4 max-sm:pl-4 max-sm:pr-3 py-5 rounded-4xl max-sm:rounded-2xl tracking-wider">
            <div ref={generatedTemplateRef}>
              <p className="mb-4">Dear HR,</p>

              <p className="mb-4">
                I am writing to express my interest in the{' '}
                {formData.finalJobRole
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}{' '}
                position at{' '}
                {formData.company
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                . With{' '}
                {formData.years > 1
                  ? `${formData.years} years and `
                  : formData.years == 1
                  ? `${formData.years} year and `
                  : ''}{' '}
                {formData.months > 1 ? `${formData.months} months ` : `${formData.months} month `} of hands-on
                experience as a{' '}
                {formData.finalDomain
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                , I bring a solid foundation in {formData.skillProficiency.join(', ')}, and a passion for
                crafting responsive, user-friendly web applications.
              </p>

              <p className="mb-4">
                I believe my skill set aligns well with your team’s goals, and I am eager to contribute and
                grow in a collaborative environment like yours.
              </p>

              <p className="mb-4">
                Please find my resume attached. Below are my key details for your reference:
              </p>

              <ul className="mb-4 leading-5.5 max-sm:leading-5 reference-list text-lg break-words whitespace-normal max-sm:text-sm">
                <li>
                  <span>Contact Number:</span> {formData.number}
                </li>
                {formData.portfolio && (
                  <li>
                    <span>Portfolio: </span>
                    <a
                      href={formData.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link hover:underline text-blue-500 hover:text-blue-600 visited:text-purple-600"
                    >
                      {formData.portfolio}
                    </a>
                  </li>
                )}

                <li>
                  <span>LinkedIn: </span>
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover:underline text-blue-500 hover:text-blue-600 visited:text-purple-600"
                  >
                    {formData.linkedin}
                  </a>
                </li>
                <li>
                  <span>Github: </span>
                  <a
                    href={formData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover:underline text-blue-500 hover:text-blue-600 visited:text-purple-600"
                  >
                    {formData.github}
                  </a>
                </li>
                <li>
                  <span>Technical Skills:</span> {formData.technicalSkills.join(', ')}
                </li>
              </ul>

              <p className="mb-4">
                Thank you for taking the time to review my application. I look forward to the opportunity to
                discuss how I can contribute to your team.
              </p>

              <p>
                Best regards,
                <br />
                <span>
                  {formData.fullName
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center" onClick={handleCopy}>
            <button
              type="button"
              className="cursor-pointer flex px-3 py-2 bg-white rounded text-black font-extrabold hover:bg-gray-300 outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
            >
              <FaRegCopy size={25} /> Copy
            </button>
          </div>
        </section>
      ) : (
        <section className="bg-stone-950 text-white text-2xl max-sm:text-lg w-full flex flex-col items-center py-20">
          <p className="flex items-center gap-2 text-gray-400 mx-5 max-sm:mx-3">
            <span>📝</span> We're waiting for your form — your template will be right here!
          </p>
        </section>
      )}
    </>
  );
};

export default Template;
