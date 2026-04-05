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
            <div className="flex gap-x-3 items-center max-sm:text-xs">
              <span>Subject:</span>
              <p ref={subjectRef}>
                Job Application -{' '}
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

              <span onClick={handleCopySubject}>
                <FaRegCopy
                  size={25}
                  className="cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                />
              </span>
            </div>
          </div>
          <div className="leading-5.5 max-sm:leading-5 w-1/2 max-lg:w-5/6 max-sm:w-full mx-5 items-start bg-neutral-800 text-white text-lg max-sm:text-sm h-auto px-4 max-sm:pl-4 max-sm:pr-3 py-5 rounded-4xl max-sm:rounded-2xl tracking-wider">
            <div ref={generatedTemplateRef}>
              <p className="mb-4">Dear Hiring Manager,</p>

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
                , I specialize in building responsive, high-performance user interfaces using{' '}
                {formData.skillProficiency.length > 1
                  ? `${formData.skillProficiency.slice(0, -1).join(', ')}, and ${
                      formData.skillProficiency[formData.skillProficiency.length - 1]
                    }`
                  : formData.skillProficiency[0]}
                {''}.
              </p>

              <p className="mb-4">
                My background combines technical development with a strong eye for design, thanks to my
                proficiency in Adobe Photoshop, Adobe Illustrator and Canva. I am confident that my ability to
                bridge the gap between design and code will bring immediate value to your development team.
              </p>

              <p className="mb-1">Quick Overview of My Profile:</p>
              <ul className="mb-4 ml-5 leading-5.5 list-disc max-sm:leading-5 reference-list text-lg break-words whitespace-normal max-sm:text-sm">
                <li>
                  <span>Technical Skills:</span> {formData.technicalSkills.join(', ')}
                </li>
                <li>
                  <span>Design Skills:</span> {formData.designSkills.join(', ')}
                </li>
                <li>
                  <span>Experience: </span>{' '}
                  {formData.months > 1 ? `${formData.months} months ` : `${formData.months} month `} (Hands-on
                  development and UI/UX implementation)
                </li>
              </ul>

              <p className="mb-1">Links & Portfolio:</p>
              <ul className="mb-4 ml-5 leading-5.5 list-disc max-sm:leading-5 reference-list text-lg break-words whitespace-normal max-sm:text-sm">
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
                  <span>Phone:</span> {formData.number}
                </li>
              </ul>

              <p className="mb-4">
                I have attached my resume for your review and would welcome the opportunity to discuss how my
                skills align with your team’s goals.
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
          <p className="text-gray-400 text-center mx-5 max-sm:mx-3 flex max-md:flex-col gap-x-2 items-center">
            <span className="text-2xl">📝</span>
            <span>We're waiting for your form — your&nbsp;template will be right here!</span>
          </p>
        </section>
      )}
    </>
  );
};

export default Template;
