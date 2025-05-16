// import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Template from './components/Template';
import { Toaster } from 'react-hot-toast';
import { useState, useCallback, useRef } from 'react';

const App = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const sectionRef = useRef(null);

  const handleFormSubmit = formdata => {
    setSubmittedData(formdata);
  };

  const handleScroll = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header />
      <Toaster position="bottom-center" toastOptions={{ duration: 6000 }} />
      <Form onSubmit={handleFormSubmit} />
      <Template formData={submittedData} handleScroll={handleScroll} sectionRef={sectionRef} />
    </>
  );
};

export default App;
