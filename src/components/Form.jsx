import { useState, useRef, useEffect } from 'react';
import { RiAddLargeFill } from 'react-icons/ri';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { IoMdDoneAll } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { FaExclamation } from 'react-icons/fa';
import { skillsList } from './data';

const sampleRole = [
  'Web Developer',
  'Front-End Developer',
  'Software Engineer',
  'React.js Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Android Developer',
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
  const [filteredSkill, setFilteredSkill] = useState([]);
  const [skillProficiency, setSkillProficiency] = useState([]);
  const [isSkillProficiencyCustom, setIsSkillProficiencyCustom] = useState(false);
  const [showSampleButton, setShowSampleButton] = useState(true);
  const [number, setNumber] = useState();
  const [touched, setTouched] = useState(false);
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [isTechnicalSkillsCustom, setIsTechnicalSkillsCustom] = useState(false);
  const [showSampleButton2, setShowSampleButton2] = useState(true);
  const [techSkillsInputValue, setTechSkillsInputValue] = useState('');
  const [filteredSkill2, setFilteredSkill2] = useState([]);
  const inputRef = useRef(null);
  const techSkillsInputRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedItemTechSkills, setSelectedItemTechSkills] = useState(-1);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isTechListVisible, setIsTechListVisible] = useState(false);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (containerRef1.current && !containerRef1.current.contains(e.target)) {
        setIsListVisible(false);
      }
      if (containerRef2.current && !containerRef2.current.contains(e.target)) {
        setIsTechListVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const el = document.querySelector(`[data-index="${selectedItem}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedItem]);

  useEffect(() => {
    const el = containerRef2.current?.querySelector(`[data-index="${selectedItemTechSkills}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedItemTechSkills]);

  const isValidPhone = () => {
    const parsed = parsePhoneNumberFromString(number);
    return parsed?.isValid() ?? false;
  };

  function handleSkillButton() {
    setSkillProficiency(sampleSkillProficiency);
    setShowSampleButton(false);
  }

  const handleAddSkill = (skill = inputValue) => {
    const formatted = skill
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const formattedLower = formatted.toLowerCase();
    const lowercasedSkills = skillProficiency.map(s => s.toLowerCase());

    if (formatted === '') return;

    if (lowercasedSkills.includes(formattedLower)) {
      toast(t => (
        <span className="flex gap-x-5 text-left">
          <span className="flex items-center text-red-500 gap-1 font-medium">
            <strong className="font-bold">{formatted}</strong> already exists
          </span>
          <button
            className="self-center cursor-pointer rounded-lg px-2 py-1 bg-stone-950 text-stone-50 border hover:bg-zinc-900 focus:ring-2 focus:ring-stone-300 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ));
      setInputValue('');
      inputRef.current?.focus();
      return;
    }

    setSkillProficiency(prev => [...prev, formatted]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleAddSkill2 = (skill = techSkillsInputValue) => {
    const formatted = skill
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const formattedLower = formatted.toLowerCase();
    const lowercasedSkills = technicalSkills.map(s => s.toLowerCase());

    if (formatted === '') return;

    if (lowercasedSkills.includes(formattedLower)) {
      toast(t => (
        <span className="flex gap-x-5 text-left">
          <span className="flex items-center text-red-500 gap-1 font-medium">
            <strong className="font-bold">{formatted}</strong> already exists
          </span>
          <button
            className="self-center cursor-pointer rounded-lg px-2 py-1 bg-stone-950 text-stone-50 border hover:bg-zinc-900 focus:ring-2 focus:ring-stone-300 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ));
      setTechSkillsInputValue('');
      techSkillsInputRef.current?.focus();
      return;
    }

    setTechnicalSkills(prev => [...prev, formatted]);
    setTechSkillsInputValue('');
    techSkillsInputRef.current?.focus();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedItem >= 0 && filteredSkill[selectedItem]) {
        handleAddSkill(filteredSkill[selectedItem]);
      } else {
        handleAddSkill();
      }
      handleAddSkill2?.();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItem(prev => {
        const newIndex = Math.max(prev - 1, 0);
        setInputValue(filteredSkill[newIndex] || '');
        return newIndex;
      });
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItem(prev => {
        const newIndex = Math.min(prev + 1, filteredSkill.length - 1);
        setInputValue(filteredSkill[newIndex] || '');
        return newIndex;
      });
      return;
    }

    // Reset if other key
    setSelectedItem(-1);
  };

  const handleTechKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedItemTechSkills >= 0 && filteredSkill2[selectedItemTechSkills]) {
        handleAddSkill2(filteredSkill2[selectedItemTechSkills]);
      } else {
        handleAddSkill2();
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItemTechSkills(prev => {
        const newIndex = Math.max(prev - 1, 0);
        setTechSkillsInputValue(filteredSkill2[newIndex] || '');
        return newIndex;
      });
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItemTechSkills(prev => {
        const newIndex = Math.min(prev + 1, filteredSkill2.length - 1);
        setTechSkillsInputValue(filteredSkill2[newIndex] || '');
        return newIndex;
      });
      return;
    }

    setSelectedItemTechSkills(-1);
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

    const errorMessages = [];

    if (!fullName.trim()) errorMessages.push('Full Name is required');
    if (!finalJobRole.trim()) errorMessages.push('Job Role is required');
    if (!company.trim()) errorMessages.push('Company is required');
    if (!finalDomain.trim()) errorMessages.push('Experience Domain is required');
    // if (!skillProficiency.length) errorMessages.push(`Click '+' to add the skill proficiency`);
    if (isSkillProficiencyCustom) {
      if (!skillProficiency.length) {
        errorMessages.push("Click '+' to add the typed skill proficiency");
      }
    } else {
      if (!skillProficiency.length) {
        errorMessages.push('Skill Proficiency is required');
      }
    }
    if (!number) {
      errorMessages.push('Phone Number is required');
    } else if (!isValidPhone()) {
      errorMessages.push('Invalid Phone Number');
    }
    if (!linkedin.trim()) errorMessages.push('Linkedin is required');
    if (!github.trim()) errorMessages.push('Github is required');
    // if (!technicalSkills.length) errorMessages.push(`Click '+' to add the technical skills`);
    if (isTechnicalSkillsCustom) {
      if (!technicalSkills.length) {
        errorMessages.push("Click '+' to add the typed technical skill");
      }
    } else {
      if (!technicalSkills.length) {
        errorMessages.push('Technical Skills is required');
      }
    }

    if (errorMessages.length) {
      toast(t => (
        <span className="flex flex-col gap-2 text-left">
          <span className="flex items-center text-red-600 gap-2">
            <FaExclamation />
            <strong>Please correct the following fields:</strong>
          </span>
          <ul className="pl-6 list-disc text-sm text-red-500">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <button
            className="self-center cursor-pointer rounded-lg px-3 py-1.5 bg-stone-950 text-stone-50 border hover:bg-zinc-900 focus:ring-2 focus:ring-stone-300 transition"
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
    // handleReset();
  };

  const searchResult = value => {
    return skillsList.filter(skill => skill.toLowerCase().includes(value.toLowerCase()));
  };

  const handleSearchInput = value => {
    setInputValue(value);
    setFilteredSkill(searchResult(value));
  };

  const searchResult2 = value => {
    return skillsList.filter(skill => skill.toLowerCase().includes(value.toLowerCase()));
  };

  const handleSearchInput2 = value => {
    setTechSkillsInputValue(value);
    setFilteredSkill2(searchResult2(value));
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
              onChange={e => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setFullName(value);
                }
              }}
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
                  onChange={e => {
                    const value = e.target.value;
                    if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                      setFinalJobRole(value);
                    }
                  }}
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
              onChange={e => {
                const value = e.target.value;
                if (/^[A-Za-z0-9\s&.,'@+()-]*$/.test(value)) {
                  setCompany(value);
                }
              }}
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
                onChange={e => {
                  if (/^\d*$/.test(e.target.value) && e.target.value.length <= 2) {
                    setYears(e.target.value);
                  }
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="years"
                min="0"
                maxLength="2"
              />
              <span>{years > 1 ? 'years' : 'year'}</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`bg-stone-900 text-white rounded outline ${
                  months ? 'pl-2' : 'pl-1'
                }  max-sm:px-0.6 max-sm:py-1 focus:outline-yellow-500 w-10`}
                value={months}
                name="months"
                placeholder="0–12"
                onChange={e => {
                  const val = e.target.value;
                  if (/^\d{0,2}$/.test(val)) {
                    const num = Number(val);
                    if (val === '' || (num >= 0 && num <= 12)) {
                      setMonths(val); // keep as string to preserve controlled input behavior
                    }
                  }
                }}
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
                  onChange={e => {
                    const value = e.target.value;
                    if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                      setFinalDomain(value);
                    }
                  }}
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
          <div className="flex max-sm:flex-col">
            <label htmlFor="skill-proficiency" className="text-xl flex min-w-[9.5rem]">
              Skill Proficiency:{' '}
            </label>

            {!isSkillProficiencyCustom ? (
              <>
                <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton ? 'flex-col' : ''}`}>
                  <div>
                    {showSampleButton && (
                      <button
                        type="button"
                        className="bg-transparent text-yellow-400 border cursor-pointer border-yellow-400 hover:bg-yellow-400 hover:text-black font-medium py-1 px-2 rounded transition-all duration-200 ease-in-out shadow-[0_0_8px_rgba(255,255,0,0.4)] hover:shadow-[0_0_10px_rgba(255,255,0,0.6)]"
                        onClick={handleSkillButton}
                      >
                        Use Sample Data
                      </button>
                    )}
                    <div className="flex gap-x-1.5 relative" ref={containerRef1}>
                      {!showSampleButton && (
                        <>
                          <input
                            ref={inputRef}
                            className="bg-stone-900 text-white rounded outline pl-2 p-0.5 max-sm:p-2 focus:outline-yellow-500"
                            value={inputValue}
                            onChange={e => {
                              const value = e.target.value;
                              if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                                handleSearchInput(value);
                                setIsListVisible(true);
                              }
                            }}
                            onFocus={() => setIsListVisible(true)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            size={20}
                            placeholder="Add more..."
                          />
                          <div className="searchList">
                            {isListVisible && inputValue && filteredSkill.length > 0 && (
                              <ul>
                                {filteredSkill.map((res, index) => (
                                  <li
                                    key={res}
                                    data-index={index}
                                    className={`py-1 pr-1 pl-2 max-sm:p-2 cursor-pointer hover:bg-blue-800 ${
                                      index === selectedItem ? 'bg-blue-700 text-white' : ''
                                    }`}
                                    onClick={() => {
                                      handleAddSkill(res);
                                      setIsListVisible(false);
                                    }}
                                    onKeyDown={handleKeyDown}
                                  >
                                    {res}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              handleAddSkill();
                            }}
                            className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                          >
                            <RiAddLargeFill size={25} />
                          </button>
                        </>
                      )}
                    </div>
                    <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-3 ">
                      {skillProficiency.map(skill => (
                        <>
                          <li className="border rounded-md pl-1 pr-3" key={skill}>
                            {skill}
                            <button
                              type="button"
                              onClick={() => setSkillProficiency(prev => prev.filter(item => item !== skill))}
                              className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
                            >
                              <IoClose
                                size={15}
                                className="hover:bg-red-700 rounded-2xl bg-red-600 text-white"
                              />
                            </button>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={`text-yellow-400 text-lg w-max m-auto underline cursor-pointer flex justify-center ${
                      !showSampleButton ? 'mt-2' : ''
                    }`}
                    onClick={() => {
                      setIsSkillProficiencyCustom(true);
                      setSkillProficiency([]);
                      setShowSampleButton(true);
                      setInputValue('');
                    }}
                  >
                    or add manually →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col" ref={containerRef1}>
                  <div className="flex gap-2 relative">
                    <input
                      ref={inputRef}
                      className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                      value={inputValue}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                          handleSearchInput(value);
                          setIsListVisible(true);
                        }
                      }}
                      onFocus={() => setIsListVisible(true)}
                      onKeyDown={handleKeyDown}
                      type="text"
                      size={20}
                      placeholder="Enter skills then hit &nbsp; '&#43;'"
                    />
                    <div className="searchList2">
                      {isListVisible && inputValue && filteredSkill.length > 0 && (
                        <ul>
                          {inputValue &&
                            filteredSkill.map((res, index) => (
                              <li
                                key={res}
                                data-index={index}
                                className={`py-1 pr-1 pl-2 max-sm:p-2 cursor-pointer hover:bg-blue-800 ${
                                  index === selectedItem ? 'bg-blue-700 text-white' : ''
                                }`}
                                onClick={() => {
                                  handleAddSkill(res);
                                  setIsListVisible(false);
                                }}
                                onKeyDown={handleKeyDown}
                              >
                                {res}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        handleAddSkill();
                      }}
                      className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                    >
                      <RiAddLargeFill size={30} />
                    </button>
                  </div>

                  <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-3">
                    {skillProficiency.map(skill => (
                      <li className="border rounded-md pl-1 pr-3 capitalize" key={skill}>
                        {skill}
                        <button
                          type="button"
                          onClick={() => setSkillProficiency(prev => prev.filter(item => item !== skill))}
                          className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
                        >
                          <IoClose size={15} className="hover:bg-red-700 rounded-2xl bg-red-600 text-white" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`${
                      skillProficiency.length ? 'mt-2 max-sm:mt-2' : ''
                    } text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center`}
                    onClick={() => {
                      setIsSkillProficiencyCustom(false);
                      setSkillProficiency([]);
                      setShowSampleButton(true);
                      setInputValue('');
                    }}
                  >
                    ← back to list
                  </button>
                </div>
              </>
            )}
          </div>

          {/* CONTACT NUMBER */}
          <div className="flex flex-col">
            <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2 ">
              <label htmlFor="number" className="text-xl">
                Contact Number:{' '}
              </label>
              <PhoneInput
                className="my-phone-input bg-stone-900 ml-2"
                placeholder="Enter phone number"
                id="number"
                value={number}
                defaultCountry="IN"
                international={false}
                limitMaxLength
                onChange={value => {
                  setNumber(value);
                  setTouched(true);
                }}
              />
            </div>
            {touched && number && !isValidPhone() && (
              <p className="text-red-500 text-sm pl-2 text-center">Please enter a valid phone number</p>
            )}
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
            <label htmlFor="skill-proficiency" className="text-xl flex min-w-[9rem]">
              Technical Skills:{' '}
            </label>

            {!isTechnicalSkillsCustom ? (
              <>
                <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton2 ? 'flex-col pt-1' : ''}`}>
                  <div>
                    {showSampleButton2 && (
                      <button
                        type="button"
                        className="bg-transparent text-yellow-400 border cursor-pointer border-yellow-400 hover:bg-yellow-400 hover:text-black font-medium py-1 px-2 rounded transition-all duration-200 ease-in-out shadow-[0_0_8px_rgba(255,255,0,0.4)] hover:shadow-[0_0_10px_rgba(255,255,0,0.6)]"
                        onClick={handleTechSkillsButton}
                      >
                        Use Sample Data
                      </button>
                    )}
                    <div className="flex gap-x-1.5 relative" ref={containerRef2}>
                      {!showSampleButton2 && (
                        <>
                          <input
                            ref={techSkillsInputRef}
                            className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                            value={techSkillsInputValue}
                            onChange={e => {
                              const value = e.target.value;
                              if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                                handleSearchInput2(value);
                              }
                            }}
                            onFocus={() => setIsTechListVisible(true)}
                            onKeyDown={handleTechKeyDown}
                            type="text"
                            size={20}
                            placeholder="Add more..."
                          />
                          <div className="searchList3">
                            {isTechListVisible && techSkillsInputValue && filteredSkill2.length > 0 && (
                              <ul>
                                {filteredSkill2.map((res, index) => (
                                  <li
                                    key={res}
                                    data-index={index}
                                    className={`py-1 pr-1 pl-2 max-sm:p-2 cursor-pointer hover:bg-blue-800 ${
                                      index === selectedItemTechSkills ? 'bg-blue-700 text-white' : ''
                                    }`}
                                    onClick={() => {
                                      handleAddSkill2(res);
                                      setIsTechListVisible(false);
                                    }}
                                    onKeyDown={handleTechKeyDown}
                                  >
                                    {res}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              handleAddSkill2();
                            }}
                            className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                          >
                            <RiAddLargeFill size={25} />
                          </button>
                        </>
                      )}
                    </div>
                    <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-3">
                      {technicalSkills.map(skill => (
                        <>
                          <li className="border rounded-md pl-1 pr-3" key={skill}>
                            {skill}
                            <button
                              type="button"
                              onClick={() => setTechnicalSkills(prev => prev.filter(item => item !== skill))}
                              className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
                            >
                              <IoClose
                                size={15}
                                className="hover:bg-red-700 rounded-2xl bg-red-600 text-white"
                              />
                            </button>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={`text-yellow-400 text-lg underline w-max m-auto cursor-pointer flex justify-center ${
                      !showSampleButton2 ? 'mt-2' : ''
                    }`}
                    onClick={() => {
                      setIsTechnicalSkillsCustom(true);
                      setTechnicalSkills([]);
                      setShowSampleButton2(true);
                      setTechSkillsInputValue('');
                    }}
                  >
                    or add manually →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col" ref={containerRef2}>
                  <div className="flex gap-2 relative">
                    <input
                      ref={techSkillsInputRef}
                      className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
                      value={techSkillsInputValue}
                      onChange={e => {
                        const value = e.target.value;
                        if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
                          handleSearchInput2(value);
                        }
                      }}
                      onFocus={() => setIsTechListVisible(true)}
                      onKeyDown={handleTechKeyDown}
                      type="text"
                      size={20}
                      placeholder="Enter skills then hit &nbsp; '&#43;'"
                    />
                    <div className="searchList4">
                      {isTechListVisible && techSkillsInputValue && filteredSkill2.length > 0 && (
                        <ul>
                          {techSkillsInputValue &&
                            filteredSkill2.map((res, index) => (
                              <li
                                key={res}
                                data-index={index}
                                className={`py-1 pr-1 pl-2 max-sm:p-2 cursor-pointer hover:bg-blue-800 ${
                                  index === selectedItemTechSkills ? 'bg-blue-700 text-white' : ''
                                }`}
                                onClick={() => {
                                  handleAddSkill2(res);
                                  setIsTechListVisible(false);
                                }}
                                onKeyDown={handleTechKeyDown}
                              >
                                {res}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSkill2}
                      className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
                    >
                      <RiAddLargeFill size={30} />
                    </button>
                  </div>

                  <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-3">
                    {technicalSkills.map(skill => (
                      <li className="border rounded-md pl-1 pr-3 capitalize" key={skill}>
                        {skill}
                        <button
                          type="button"
                          onClick={() => setTechnicalSkills(prev => prev.filter(item => item !== skill))}
                          className="translate-x-0.5 -translate-y-1 rounded-3xl text-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
                        >
                          <IoClose size={15} className="hover:bg-red-700 rounded-2xl bg-red-600 text-white" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`${
                      technicalSkills.length ? 'mt-2 max-sm:mt-2' : ''
                    } text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center`}
                    onClick={() => {
                      setIsTechnicalSkillsCustom(false);
                      setTechnicalSkills([]);
                      setShowSampleButton2(true);
                      setTechSkillsInputValue('');
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

// import { useState } from 'react';
// import { RiAddLargeFill } from 'react-icons/ri';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { useRef } from 'react';
// import { IoMdDoneAll } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import toast from 'react-hot-toast';
// import { FaExclamation } from 'react-icons/fa';

// const sampleRole = [
//   'Web Developer',
//   'Front-End Developer',
//   'Software Engineer',
//   'React.js Developer',
//   'Backend Developer',
//   'Full Stack Developer',
//   'Android Developer',
// ];

// const sampleSkillProficiency = ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'React.js'];

// const sampleTechnicalSkills = [
//   'HTML5',
//   'CSS3',
//   'Bootstrap',
//   'Tailwind CSS',
//   'JavaScript',
//   'React.js',
//   'Git/Github',
//   'Adobe Photoshop',
//   'Adobe Illustrator',
// ];

// const Form = ({ onSubmit }) => {
//   const [fullName, setFullName] = useState('');
//   const [finalJobRole, setFinalJobRole] = useState('');
//   const [isCustom, setIsCustom] = useState(false);
//   const [company, setCompany] = useState('');
//   const [years, setYears] = useState(0);
//   const [months, setMonths] = useState(1);
//   const [finalDomain, setFinalDomain] = useState('');
//   const [isDomainCustom, setIsDomainCustom] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [skillProficiency, setSkillProficiency] = useState([]);
//   const [isSkillProficiencyCustom, setIsSkillProficiencyCustom] = useState(false);
//   const [showSampleButton, setShowSampleButton] = useState(true);
//   const [number, setNumber] = useState();
//   const [touched, setTouched] = useState(false);
//   const [portfolio, setPortfolio] = useState('');
//   const [linkedin, setLinkedin] = useState('');
//   const [github, setGithub] = useState('');
//   const [technicalSkills, setTechnicalSkills] = useState([]);
//   const [isTechnicalSkillsCustom, setIsTechnicalSkillsCustom] = useState(false);
//   const [showSampleButton2, setShowSampleButton2] = useState(true);
//   const [techSkillsInputValue, setTechSkillsInputValue] = useState('');
//   const inputRef = useRef(null);
//   const techSkillsInputRef = useRef(null);

//   const isValidPhone = () => {
//     const parsed = parsePhoneNumberFromString(number);
//     return parsed?.isValid() ?? false;
//   };

//   function handleSkillButton() {
//     setSkillProficiency(sampleSkillProficiency);
//     setShowSampleButton(false);
//   }

//   const handleAddSkill = () => {
//     if (inputValue.trim() !== '') {
//       setSkillProficiency(prev => [
//         ...prev,
//         inputValue
//           .trim()
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(' '),
//       ]);
//       setInputValue('');
//       inputRef.current?.focus();
//     }
//   };

//   const handleAddSkill2 = () => {
//     if (techSkillsInputValue.trim() !== '') {
//       setTechnicalSkills(prev => [
//         ...prev,
//         techSkillsInputValue
//           .trim()
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(' '),
//       ]);
//       setTechSkillsInputValue('');
//       techSkillsInputRef.current?.focus();
//     }
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddSkill();
//       handleAddSkill2();
//     }
//   };

//   function handleTechSkillsButton() {
//     setTechnicalSkills(sampleTechnicalSkills);
//     setShowSampleButton2(false);
//   }

//   const handleReset = () => {
//     setFullName('');
//     setFinalJobRole('');
//     setIsCustom(false);
//     setCompany('');
//     setYears(0);
//     setMonths(1);
//     setFinalDomain('');
//     setIsDomainCustom(false);
//     setInputValue('');
//     setSkillProficiency([]);
//     setIsSkillProficiencyCustom(false);
//     setShowSampleButton(true);
//     setNumber();
//     setPortfolio('');
//     setLinkedin('');
//     setGithub('');
//     setTechnicalSkills([]);
//     setTechSkillsInputValue('');
//     setIsTechnicalSkillsCustom(false);
//     setShowSampleButton2(true);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     const errorMessages = [];

//     if (!fullName.trim()) errorMessages.push('Full Name is required');
//     if (!finalJobRole.trim()) errorMessages.push('Job Role is required');
//     if (!company.trim()) errorMessages.push('Company is required');
//     if (!finalDomain.trim()) errorMessages.push('Experience Domain is required');
//     // if (!skillProficiency.length) errorMessages.push(`Click '+' to add the skill proficiency`);
//     if (isSkillProficiencyCustom) {
//       if (!skillProficiency.length) {
//         errorMessages.push("Click '+' to add the typed skill proficiency");
//       }
//     } else {
//       if (!skillProficiency.length) {
//         errorMessages.push('Skill Proficiency is required');
//       }
//     }
//     if (!number) {
//       errorMessages.push('Phone Number is required');
//     } else if (!isValidPhone()) {
//       errorMessages.push('Invalid Phone Number');
//     }
//     if (!linkedin.trim()) errorMessages.push('Linkedin is required');
//     if (!github.trim()) errorMessages.push('Github is required');
//     // if (!technicalSkills.length) errorMessages.push(`Click '+' to add the technical skills`);
//     if (isTechnicalSkillsCustom) {
//       if (!technicalSkills.length) {
//         errorMessages.push("Click '+' to add the typed technical skill");
//       }
//     } else {
//       if (!technicalSkills.length) {
//         errorMessages.push('Technical Skills is required');
//       }
//     }

//     if (errorMessages.length) {
//       toast(t => (
//         <span className="flex flex-col gap-2 text-left">
//           <span className="flex items-center text-red-600 gap-2">
//             <FaExclamation />
//             <strong>Please correct the following fields:</strong>
//           </span>
//           <ul className="pl-6 list-disc text-sm text-red-500">
//             {errorMessages.map((msg, index) => (
//               <li key={index}>{msg}</li>
//             ))}
//           </ul>
//           <button
//             className="self-center cursor-pointer rounded-lg px-3 py-1.5 bg-stone-950 text-stone-50 border hover:bg-zinc-900 focus:ring-2 focus:ring-stone-300 transition"
//             onClick={() => toast.dismiss(t.id)}
//           >
//             Dismiss
//           </button>
//         </span>
//       ));
//       return;
//     }

//     const formData = {
//       fullName,
//       finalJobRole,
//       company,
//       years,
//       months,
//       finalDomain,
//       skillProficiency,
//       number,
//       portfolio,
//       linkedin,
//       github,
//       technicalSkills,
//     };
//     onSubmit(formData);
//     // handleReset();
//   };

//   return (
//     <section className="bg-stone-950 text-white w-full flex flex-col items-center">
//       <div className="w-full text-center">
//         <p className="form-heading text-4xl text-white mb-10 px-2 max-sm:text-3xl">
//           Just fill out the form below — your template will be ready in seconds!
//         </p>
//       </div>

//       <div className="flex w-[37rem] max-sm:w-7/8 max-sm:px-1">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full flex flex-col gap-y-5 max-sm:gap-y-2 rounded-xl p-4 shadow-amber-500 shadow-md"
//         >
//           {/* FULL NAME */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="fullName" className="text-xl">
//               Full Name:{' '}
//             </label>
//             <input
//               className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//               value={fullName}
//               id="fullName"
//               onChange={e => {
//                 const value = e.target.value;
//                 if (/^[A-Za-z\s]*$/.test(value)) {
//                   setFullName(value);
//                 }
//               }}
//               type="text"
//               size={30}
//               placeholder="Enter full name"
//             />
//           </div>
//           {/* ROLE */}
//           <div className="flex gap-2 max-sm:flex-col ">
//             <label htmlFor="role" className="text-xl">
//               Job Role:{' '}
//             </label>

//             {!isCustom ? (
//               <>
//                 <select
//                   name="role"
//                   id="role"
//                   value={finalJobRole}
//                   onChange={e => setFinalJobRole(e.target.value)}
//                   className="bg-stone-900 border rounded p-0.5 max-sm:p-2"
//                 >
//                   <option value="">-- Select a role --</option>
//                   {sampleRole.map(role => (
//                     <option className="bg-stone-900 text-white" value={role} key={role}>
//                       {role}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
//                   onClick={() => {
//                     setIsCustom(true);
//                     setFinalJobRole('');
//                   }}
//                 >
//                   or specify custom →
//                 </button>
//               </>
//             ) : (
//               <>
//                 <input
//                   className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                   value={finalJobRole}
//                   onChange={e => {
//                     const value = e.target.value;
//                     if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                       setFinalJobRole(value);
//                     }
//                   }}
//                   type="text"
//                   placeholder="Enter your role"
//                 />
//                 <button
//                   type="button"
//                   className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
//                   onClick={() => {
//                     setIsCustom(false);
//                     setFinalJobRole('');
//                   }}
//                 >
//                   ← back to list
//                 </button>
//               </>
//             )}
//           </div>

//           {/* COMPANY */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="company" className="text-xl">
//               Company:{' '}
//             </label>
//             <input
//               className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//               value={company}
//               id="company"
//               onChange={e => {
//                 const value = e.target.value;
//                 if (/^[A-Za-z0-9\s&.,'@+()-]*$/.test(value)) {
//                   setCompany(value);
//                 }
//               }}
//               type="text"
//               size={30}
//               placeholder="Enter company name"
//             />
//           </div>

//           {/* EXPERIENCE */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="experience" className="text-xl">
//               Experience:{' '}
//             </label>
//             <div className="flex gap-2">
//               <input
//                 className="bg-stone-900 text-white rounded outline pl-2 max-sm:px-2 max-sm:py-1 focus:outline-yellow-500 w-10"
//                 value={years}
//                 id="experience"
//                 onChange={e => {
//                   if (/^\d*$/.test(e.target.value) && e.target.value.length <= 2) {
//                     setYears(e.target.value);
//                   }
//                 }}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 name="years"
//                 min="0"
//                 maxLength="2"
//               />
//               <span>{years > 1 ? 'years' : 'year'}</span>
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 className={`bg-stone-900 text-white rounded outline ${
//                   months ? 'pl-2' : 'pl-1'
//                 }  max-sm:px-2 max-sm:py-1 focus:outline-yellow-500 w-10`}
//                 value={months}
//                 name="months"
//                 placeholder="0–12"
//                 onChange={e => {
//                   const val = e.target.value;
//                   if (/^\d{0,2}$/.test(val)) {
//                     const num = Number(val);
//                     if (val === '' || (num >= 0 && num <= 12)) {
//                       setMonths(val); // keep as string to preserve controlled input behavior
//                     }
//                   }
//                 }}
//               />
//               <span>{months > 1 ? 'months' : 'month'}</span>
//             </div>
//           </div>

//           {/* EXPERIENCE DOMAIN */}
//           <div className="flex gap-2 max-sm:flex-col ">
//             <label htmlFor="domain" className="text-xl">
//               Experience Domain:{' '}
//             </label>

//             {!isDomainCustom ? (
//               <>
//                 <select
//                   name="domain"
//                   id="domain"
//                   value={finalDomain}
//                   onChange={e => setFinalDomain(e.target.value)}
//                   className="bg-stone-900 border rounded p-0.5 max-sm:p-2"
//                 >
//                   <option value="">-- Select a role --</option>
//                   {sampleRole.map(domain => (
//                     <option className="bg-stone-900 text-white" value={domain} key={domain}>
//                       {domain}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
//                   onClick={() => {
//                     setIsDomainCustom(true);
//                     setFinalDomain('');
//                   }}
//                 >
//                   or specify custom →
//                 </button>
//               </>
//             ) : (
//               <>
//                 <input
//                   className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                   value={finalDomain}
//                   onChange={e => {
//                     const value = e.target.value;
//                     if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                       setFinalDomain(value);
//                     }
//                   }}
//                   type="text"
//                   placeholder="Enter your domain"
//                 />
//                 <button
//                   type="button"
//                   className="text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto"
//                   onClick={() => {
//                     setIsDomainCustom(false);
//                     setFinalDomain('');
//                   }}
//                 >
//                   ← back to list
//                 </button>
//               </>
//             )}
//           </div>

//           {/* SKILL PROFICIENCY */}
//           <div className="flex max-sm:flex-col">
//             <label htmlFor="skill-proficiency" className="text-xl flex min-w-[9.5rem]">
//               Skill Proficiency:{' '}
//             </label>

//             {!isSkillProficiencyCustom ? (
//               <>
//                 <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton ? 'flex-col pt-1' : ''}`}>
//                   <div>
//                     {showSampleButton && (
//                       <button
//                         type="button"
//                         className="bg-transparent text-yellow-400 border cursor-pointer border-yellow-400 hover:bg-yellow-400 hover:text-black font-medium py-1 px-2 rounded transition-all duration-200 ease-in-out shadow-[0_0_8px_rgba(255,255,0,0.4)] hover:shadow-[0_0_10px_rgba(255,255,0,0.6)]"
//                         onClick={handleSkillButton}
//                       >
//                         Use Sample Data
//                       </button>
//                     )}
//                     <div className="flex gap-x-1.5">
//                       {!showSampleButton && (
//                         <>
//                           <input
//                             ref={inputRef}
//                             className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                             value={inputValue}
//                             onChange={e => {
//                               const value = e.target.value;
//                               if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                                 setInputValue(value);
//                               }
//                             }}
//                             onKeyDown={handleKeyDown}
//                             type="text"
//                             size={15}
//                             placeholder="Add more..."
//                           />
//                           <button
//                             type="button"
//                             onClick={handleAddSkill}
//                             className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
//                           >
//                             <RiAddLargeFill size={25} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                     <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-1.5 ">
//                       {skillProficiency.map(skill => (
//                         <>
//                           <li className="border rounded-md pl-1 pr-3" key={skill}>
//                             {skill}
//                             <button
//                               type="button"
//                               onClick={() => setSkillProficiency(prev => prev.filter(item => item !== skill))}
//                               className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
//                             >
//                               <IoClose
//                                 size={15}
//                                 className="hover:bg-red-700 rounded-2xl bg-red-600 text-white"
//                               />
//                             </button>
//                           </li>
//                         </>
//                       ))}
//                     </ul>
//                   </div>
//                   <button
//                     type="button"
//                     className={`text-yellow-400 text-lg underline cursor-pointer flex justify-center ${
//                       !showSampleButton ? 'mt-2' : ''
//                     }`}
//                     onClick={() => {
//                       setIsSkillProficiencyCustom(true);
//                       setSkillProficiency([]);
//                       setShowSampleButton(true);
//                       setInputValue('');
//                     }}
//                   >
//                     or add manually →
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col">
//                   <div className="flex gap-2">
//                     <input
//                       ref={inputRef}
//                       className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                       value={inputValue}
//                       onChange={e => {
//                         const value = e.target.value;
//                         if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                           setInputValue(value);
//                         }
//                       }}
//                       onKeyDown={handleKeyDown}
//                       type="text"
//                       placeholder="Enter skills then hit &nbsp; '&#43;'"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleAddSkill}
//                       className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
//                     >
//                       <RiAddLargeFill size={30} />
//                     </button>
//                   </div>

//                   <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-1.5">
//                     {skillProficiency.map(skill => (
//                       <li className="border rounded-md pl-1 pr-3 capitalize" key={skill}>
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => setSkillProficiency(prev => prev.filter(item => item !== skill))}
//                           className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
//                         >
//                           <IoClose size={15} className="hover:bg-red-700 rounded-2xl bg-red-600 text-white" />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>

//                   <button
//                     type="button"
//                     className={`${
//                       skillProficiency.length ? 'mt-2 max-sm:mt-2' : ''
//                     } text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center`}
//                     onClick={() => {
//                       setIsSkillProficiencyCustom(false);
//                       setSkillProficiency([]);
//                       setShowSampleButton(true);
//                       setInputValue('');
//                     }}
//                   >
//                     ← back to list
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* CONTACT NUMBER */}
//           <div className="flex flex-col">
//             <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2 ">
//               <label htmlFor="number" className="text-xl">
//                 Contact Number:{' '}
//               </label>
//               <PhoneInput
//                 className="my-phone-input bg-stone-900 ml-2"
//                 placeholder="Enter phone number"
//                 id="number"
//                 value={number}
//                 defaultCountry="IN"
//                 international={false}
//                 limitMaxLength
//                 onChange={value => {
//                   setNumber(value);
//                   setTouched(true);
//                 }}
//               />
//             </div>
//             {touched && number && !isValidPhone() && (
//               <p className="text-red-500 text-sm pl-2 text-center">Please enter a valid phone number</p>
//             )}
//           </div>

//           {/* PORTFOLIO */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="portfolio" className="portfolio-label text-xl">
//               Portfolio:{' '}
//             </label>
//             <input
//               className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//               value={portfolio}
//               id="portfolio"
//               onChange={e => setPortfolio(e.target.value)}
//               type="url"
//               size={30}
//               placeholder="Enter portfolio link"
//             />
//           </div>

//           {/* LINKEDIN */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="linkedin" className="text-xl">
//               LinkedIn Profile:{' '}
//             </label>
//             <input
//               className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//               value={linkedin}
//               id="linkedin"
//               onChange={e => setLinkedin(e.target.value)}
//               type="url"
//               size={36}
//               placeholder="Enter linkedin profile url"
//             />
//           </div>

//           {/* GITHUB */}
//           <div className="flex gap-2 max-sm:flex-col max-sm:gap-y-2">
//             <label htmlFor="github" className="text-xl">
//               Github Profile:{' '}
//             </label>
//             <input
//               className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//               value={github}
//               id="github"
//               onChange={e => setGithub(e.target.value)}
//               type="url"
//               size={36}
//               placeholder="Enter github profile url"
//             />
//           </div>

//           {/* TECHNICAL SKILLS */}
//           <div className="flex gap-2 max-sm:flex-col">
//             <label htmlFor="skill-proficiency" className="text-xl flex min-w-[9rem]">
//               Technical Skills:{' '}
//             </label>

//             {!isTechnicalSkillsCustom ? (
//               <>
//                 <div className={`flex gap-x-2 max-sm:flex-col ${!showSampleButton2 ? 'flex-col pt-1' : ''}`}>
//                   <div>
//                     {showSampleButton2 && (
//                       <button
//                         type="button"
//                         className="bg-transparent text-yellow-400 border cursor-pointer border-yellow-400 hover:bg-yellow-400 hover:text-black font-medium py-1 px-2 rounded transition-all duration-200 ease-in-out shadow-[0_0_8px_rgba(255,255,0,0.4)] hover:shadow-[0_0_10px_rgba(255,255,0,0.6)]"
//                         onClick={handleTechSkillsButton}
//                       >
//                         Use Sample Data
//                       </button>
//                     )}
//                     <div className="flex gap-x-1.5">
//                       {!showSampleButton2 && (
//                         <>
//                           <input
//                             ref={techSkillsInputRef}
//                             className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                             value={techSkillsInputValue}
//                             onChange={e => {
//                               const value = e.target.value;
//                               if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                                 setTechSkillsInputValue(value);
//                               }
//                             }}
//                             onKeyDown={handleKeyDown}
//                             type="text"
//                             size={15}
//                             placeholder="Add more..."
//                           />
//                           <button
//                             type="button"
//                             onClick={handleAddSkill2}
//                             className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
//                           >
//                             <RiAddLargeFill size={25} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                     <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-1.5">
//                       {technicalSkills.map(skill => (
//                         <>
//                           <li className="border rounded-md pl-1 pr-3" key={skill}>
//                             {skill}
//                             <button
//                               type="button"
//                               onClick={() => setTechnicalSkills(prev => prev.filter(item => item !== skill))}
//                               className="translate-x-0.5 -translate-y-1 rounded-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
//                             >
//                               <IoClose
//                                 size={15}
//                                 className="hover:bg-red-700 rounded-2xl bg-red-600 text-white"
//                               />
//                             </button>
//                           </li>
//                         </>
//                       ))}
//                     </ul>
//                   </div>
//                   <button
//                     type="button"
//                     className={`text-yellow-400 text-lg underline cursor-pointer flex justify-center ${
//                       !showSampleButton2 ? 'mt-2' : ''
//                     }`}
//                     onClick={() => {
//                       setIsTechnicalSkillsCustom(true);
//                       setTechnicalSkills([]);
//                       setShowSampleButton2(true);
//                       setTechSkillsInputValue('');
//                     }}
//                   >
//                     or add manually →
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col">
//                   <div className="flex gap-2">
//                     <input
//                       ref={techSkillsInputRef}
//                       className="bg-stone-900 text-white rounded outline pl-2 max-sm:p-2 focus:outline-yellow-500"
//                       value={techSkillsInputValue}
//                       onChange={e => {
//                         const value = e.target.value;
//                         if (/^[A-Za-z0-9\s&.,'@+()#/-]*$/.test(value)) {
//                           setTechSkillsInputValue(value);
//                         }
//                       }}
//                       onKeyDown={handleKeyDown}
//                       type="text"
//                       placeholder="Enter skills then hit &nbsp; '&#43;'"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleAddSkill2}
//                       className="cursor-pointer hover:text-yellow-500 focus:text-yellow-500"
//                     >
//                       <RiAddLargeFill size={30} />
//                     </button>
//                   </div>

//                   <ul className="flex gap-x-3 gap-y-2 flex-wrap mt-1.5">
//                     {technicalSkills.map(skill => (
//                       <li className="border rounded-md pl-1 pr-3 capitalize" key={skill}>
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => setTechnicalSkills(prev => prev.filter(item => item !== skill))}
//                           className="translate-x-0.5 -translate-y-1 rounded-3xl text-3xl close-btn cursor-pointer text-red-500 hover:text-red-700 bg-stone-950"
//                         >
//                           <IoClose size={15} className="hover:bg-red-700 rounded-2xl bg-red-600 text-white" />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>

//                   <button
//                     type="button"
//                     className={`${
//                       technicalSkills.length ? 'mt-2 max-sm:mt-2' : ''
//                     } text-yellow-400 text-lg underline cursor-pointer max-sm:w-max max-sm:m-auto flex justify-center`}
//                     onClick={() => {
//                       setIsTechnicalSkillsCustom(false);
//                       setTechnicalSkills([]);
//                       setShowSampleButton2(true);
//                       setTechSkillsInputValue('');
//                     }}
//                   >
//                     ← back to list
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="flex justify-center gap-x-5 max-sm:mt-6">
//             <button
//               type="button"
//               className=" text-white text-lg font-bold cursor-pointer rounded px-3 py-1 bg-red-600 hover:bg-red-700 outline-none focus:ring-2 shadow-lg transform active:scale-75 transition-transform"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className=" text-white text-lg font-bold cursor-pointer rounded px-6 py-1 bg-green-600 hover:bg-green-700 outline-none focus:ring-2 shadow-lg transform active:scale-75 transition-transform"
//             >
//               <IoMdDoneAll size={40} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Form;
