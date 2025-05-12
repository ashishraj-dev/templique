import { useState } from 'react';
import { RiAddLargeFill } from 'react-icons/ri';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useRef } from 'react';
import { IoMdDoneAll } from 'react-icons/io';
import toast from 'react-hot-toast';
import { FaExclamation } from 'react-icons/fa';

const sampleRole = [
  'Web Developer',
  'Front-End Developer',
  'React.js Developer',
  'Backend Developer',
  'Full Stack Developer',
];

const sampleSkillProficiency = ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'React.js'];

const sampleTechnicalSkills = [
  'HTML5',
  'CSS3',
  'Bootstrap',
  'Tailwind CSS',
  'JavaScript',
  'React.js',
  'Git/Github',
  'Adobe Photoshop',
  'Adobe Illustrator',
];

const Form = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [finalJobRole, setFinalJobRole] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [company, setCompany] = useState('');
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(1);
  const [finalDomain, setFinalDomain] = useState('');
  const [isDomainCustom, setIsDomainCustom] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [skillProficiency, setSkillProficiency] = useState([]);
  const [isSkillProficiencyCustom, setIsSkillProficiencyCustom] = useState(false);
  const [showSampleButton, setShowSampleButton] = useState(true);
  const [number, setNumber] = useState();
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [isTechnicalSkillsCustom, setIsTechnicalSkillsCustom] = useState(false);
  const [showSampleButton2, setShowSampleButton2] = useState(true);
  const [techSkillsInputValue, setTechSkillsInputValue] = useState('');
  const inputRef = useRef(null);

  function handleSkillButton() {
    setSkillProficiency(sampleSkillProficiency);
    setShowSampleButton(false);
  }

  const handleAddSkill = () => {
    if (inputValue.trim() !== '') {
      setSkillProficiency(prev => [
        ...prev,
        inputValue
          .trim()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      ]);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  function handleTechSkillsButton() {
    setTechnicalSkills(sampleTechnicalSkills);
    setShowSampleButton2(false);
  }

  const handleReset = () => {
    setFullName('');
    setFinalJobRole('');
    setIsCustom(false);
    setCompany('');
    setYears(0);
    setMonths(1);
    setFinalDomain('');
    setIsDomainCustom(false);
    setInputValue('');
    setSkillProficiency([]);
    setIsSkillProficiencyCustom(false);
    setShowSampleButton(true);
    setNumber();
    setPortfolio('');
    setLinkedin('');
    setGithub('');
    setTechnicalSkills([]);
    setTechSkillsInputValue('');
    setIsTechnicalSkillsCustom(false);
    setShowSampleButton2(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !fullName ||
      !finalJobRole ||
      !company ||
      !finalDomain ||
      !skillProficiency.length ||
      !number ||
      !linkedin ||
      !github ||
      !technicalSkills.length
    ) {
      toast(t => (
        <span className="flex gap-10">
          <span className="flex text-red-600 items-center">
            <FaExclamation /> <strong>Please fill all fields</strong>
          </span>

          <button
            className="cursor-pointer rounded-lg px-3 py-1.5 bg-stone-950 text-stone-50 border hover:bg-zinc-900 focus:ring-2 focus:ring-stone-300 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ));
      return;
    }

    const formData = {
      fullName,
      finalJobRole,
      company,
      years,
      months,
      finalDomain,
      skillProficiency,
      number,
      portfolio,
      linkedin,
      github,
      technicalSkills,
    };
    onSubmit(formData);
    handleReset();
  };

  const handleAddSkill2 = () => {
    if (techSkillsInputValue.trim() !== '') {
      setTechnicalSkills(prev => [
        ...prev,
        techSkillsInputValue
          .trim()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      ]);
      setTechSkillsInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
      handleAddSkill2();
    }
  };

  return (
    <section className="bg-stone-950 text-white w-full flex flex-col items-center">
      <div className="w-full text-center">
        <p className="form-heading text-4xl text-white mb-10 px-2 max-sm:text-3xl">
          Just fill out the form below — your template will be ready in seconds!
        </p>
      </div>

      <div className="flex w-[37rem] max-sm:w-7/8 max-sm:px-1">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-5 max-sm:gap-y-2 rounded-xl p-4 shadow-amber-500 shadow-md"
        >
          {/* FULL NAME */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="fullName" className="text-xl">
              Full Name:{' '}
            </label>
            <input
              className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
              value={fullName}
              id="fullName"
              onChange={e => setFullName(e.target.value)}
              type="text"
              size={30}
              placeholder="Enter full name"
            />
          </div>
          {/* ROLE */}
          <div className="flex gap-2 max-sm:flex-col ">
            <label htmlFor="role" className="text-xl">
              Job Role:{' '}
            </label>

            {!isCustom ? (
              <>
                <select
                  name="role"
                  id="role"
                  value={finalJobRole}
                  onChange={e => setFinalJobRole(e.target.value)}
                  className="bg-stone-900 border rounded p-0.5 max-sm:p-2"
                >
                  <option value="">-- Select a role --</option>
                  {sampleRole.map(role => (
                    <option className="bg-stone-900 text-white" value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
                  onClick={() => {
                    setIsCustom(true);
                    setFinalJobRole('');
                  }}
                >
                  or specify custom →
                </button>
              </>
            ) : (
              <>
                <input
                  className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                  value={finalJobRole}
                  onChange={e => setFinalJobRole(e.target.value)}
                  type="text"
                  placeholder="Enter your role"
                />
                <button
                  type="button"
                  className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
                  onClick={() => {
                    setIsCustom(false);
                    setFinalJobRole('');
                  }}
                >
                  ← back to list
                </button>
              </>
            )}
          </div>

          {/* COMPANY */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="company" className="text-xl">
              Company:{' '}
            </label>
            <input
              className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
              value={company}
              id="company"
              onChange={e => setCompany(e.target.value)}
              type="text"
              size={30}
              placeholder="Enter company name"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="experience" className="text-xl">
              Experience:{' '}
            </label>
            <div className="flex gap-2">
              <input
                className="bg-stone-900 text-white rounded outline pl-2 max-sm:px-2 max-sm:py-1 focus:outline-yellow-500 w-10"
                value={years}
                id="experience"
                onChange={e => setYears(e.target.value)}
                type="number"
                name="years"
                min="0"
              />
              <span>{years > 1 ? 'years' : 'year'}</span>
              <input
                className="bg-stone-900 text-white rounded outline pl-2 max-sm:px-2 max-sm:py-1 focus:outline-yellow-500 w-10"
                value={months}
                onChange={e => setMonths(e.target.value)}
                type="number"
                name="years"
                min="0"
                max="12"
              />
              <span>{months > 1 ? 'months' : 'month'}</span>
            </div>
          </div>

          {/* EXPERIENCE DOMAIN */}
          <div className="flex gap-2 max-sm:flex-col ">
            <label htmlFor="domain" className="text-xl">
              Experience Domain:{' '}
            </label>

            {!isDomainCustom ? (
              <>
                <select
                  name="domain"
                  id="domain"
                  value={finalDomain}
                  onChange={e => setFinalDomain(e.target.value)}
                  className="bg-stone-900 border rounded p-0.5 max-sm:p-2"
                >
                  <option value="">-- Select a role --</option>
                  {sampleRole.map(domain => (
                    <option className="bg-stone-900 text-white" value={domain} key={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
                  onClick={() => {
                    setIsDomainCustom(true);
                    setFinalDomain('');
                  }}
                >
                  or specify custom →
                </button>
              </>
            ) : (
              <>
                <input
                  className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                  value={finalDomain}
                  onChange={e => setFinalDomain(e.target.value)}
                  type="text"
                  placeholder="Enter your domain"
                />
                <button
                  type="button"
                  className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
                  onClick={() => {
                    setIsDomainCustom(false);
                    setFinalDomain('');
                  }}
                >
                  ← back to list
                </button>
              </>
            )}
          </div>

          {/* SKILL PROFICIENCY */}
          <div className="flex gap-2 max-sm:flex-col">
            <label
              htmlFor="skill-proficiency"
              className={`text-xl flex ${!showSampleButton ? 'basis-46 max-sm:basis-0' : 'basis-auto'}`}
            >
              Skill Proficiency:{' '}
            </label>

            {!isSkillProficiencyCustom ? (
              <>
                <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton ? 'flex-col' : ''}`}>
                  <div>
                    {showSampleButton && (
                      <button
                        type="button"
                        className="bg-white hover:bg-violet-700 hover:text-white text-gray-800 font-semibold py-1 px-2 border cursor-pointer border-gray-400 rounded shadow"
                        onClick={handleSkillButton}
                      >
                        Use Sample Data
                      </button>
                    )}
                    <ul className="flex gap-2  flex-wrap mt-1.5">
                      {skillProficiency.map(skill => (
                        <li className="border rounded-md px-1.5" key={skill}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={'text-yellow-400 text-lg underline cursor-pointer flex justify-center'}
                    onClick={() => {
                      setIsSkillProficiencyCustom(true);
                      setSkillProficiency([]);
                      setShowSampleButton(true);
                    }}
                  >
                    or add manually →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      type="text"
                      placeholder="Enter your skills"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                    >
                      <RiAddLargeFill size={30} />
                    </button>
                  </div>

                  <ul className="flex gap-2 flex-wrap mt-1.5">
                    {skillProficiency.map(skill => (
                      <li className="border rounded-md px-1.5 capitalize" key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center"
                    onClick={() => {
                      setIsSkillProficiencyCustom(false);
                      setSkillProficiency([]);
                      setShowSampleButton(true);
                    }}
                  >
                    ← back to list
                  </button>
                </div>
              </>
            )}
          </div>

          {/* CONTACT NUMBER */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2 ">
            <label htmlFor="number" className="text-xl">
              Contact Number:{' '}
            </label>
            <PhoneInput
              className="my-phone-input bg-stone-900"
              placeholder="Enter phone number"
              id="number"
              value={number}
              defaultCountry="IN"
              onChange={setNumber}
            />
          </div>

          {/* PORTFOLIO */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="portfolio" className="portfolio-label text-xl">
              Portfolio:{' '}
            </label>
            <input
              className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
              value={portfolio}
              id="portfolio"
              onChange={e => setPortfolio(e.target.value)}
              type="url"
              size={30}
              placeholder="Enter portfolio link"
            />
          </div>

          {/* LINKEDIN */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="linkedin" className="text-xl">
              LinkedIn Profile:{' '}
            </label>
            <input
              className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
              value={linkedin}
              id="linkedin"
              onChange={e => setLinkedin(e.target.value)}
              type="url"
              size={36}
              placeholder="Enter linkedin profile url"
            />
          </div>

          {/* GITHUB */}
          <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
            <label htmlFor="github" className="text-xl">
              Github Profile:{' '}
            </label>
            <input
              className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
              value={github}
              id="github"
              onChange={e => setGithub(e.target.value)}
              type="url"
              size={36}
              placeholder="Enter github profile url"
            />
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="flex gap-2 max-sm:flex-col">
            <label
              htmlFor="skill-proficiency"
              className={`text-xl flex ${!showSampleButton2 ? 'basis-46 max-sm:basis-0' : 'basis-auto'}`}
            >
              Technical Skills:{' '}
            </label>

            {!isTechnicalSkillsCustom ? (
              <>
                <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton2 ? 'flex-col' : ''}`}>
                  <div>
                    {showSampleButton2 && (
                      <button
                        type="button"
                        className="bg-white hover:bg-violet-700 hover:text-white text-gray-800 font-semibold py-1 px-2 border cursor-pointer border-gray-400 rounded shadow"
                        onClick={handleTechSkillsButton}
                      >
                        Use Sample Data
                      </button>
                    )}
                    <ul className="flex gap-2  flex-wrap mt-1.5">
                      {technicalSkills.map(skill => (
                        <li className="border rounded-md px-1.5" key={skill}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="text-yellow-400 text-lg underline cursor-pointer flex justify-center"
                    onClick={() => {
                      setIsTechnicalSkillsCustom(true);
                      setTechnicalSkills([]);
                      setShowSampleButton2(true);
                    }}
                  >
                    or add manually →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                      value={techSkillsInputValue}
                      onChange={e => setTechSkillsInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      type="text"
                      placeholder="Enter your skills"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill2}
                      className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                    >
                      <RiAddLargeFill size={30} />
                    </button>
                  </div>

                  <ul className="flex gap-2 flex-wrap mt-1.5">
                    {technicalSkills.map(skill => (
                      <li className="border rounded-md px-1.5 capitalize" key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center"
                    onClick={() => {
                      setIsTechnicalSkillsCustom(false);
                      setTechnicalSkills([]);
                      setShowSampleButton2(true);
                    }}
                  >
                    ← back to list
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center gap-x-5 max-sm:mt-6">
            <button
              type="button"
              className=" text-white text-lg font-bold cursor-pointer rounded px-3 py-1 bg-red-600 hover:bg-red-700 outline-none focus:ring-2 shadow-lg transform active:scale-75 transition-transform"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className=" text-white text-lg font-bold cursor-pointer rounded px-6 py-1 bg-green-600 hover:bg-green-700 outline-none focus:ring-2 shadow-lg transform active:scale-75 transition-transform"
            >
              <IoMdDoneAll size={40} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
