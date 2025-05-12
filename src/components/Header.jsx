const Header = () => {
  function refreshPage() {
    window.parent.location = window.parent.location.href;
  }
  return (
    <header>
      <div className="heading bg-stone-950 w-full flex justify-center py-5">
        {/* <h1 className="text-4xl text-white text-center">Email Template Generator</h1> */}
        <img
          src="/assets/Templique-logo-new.png"
          className="w-xs max-sm:px-5 cursor-pointer"
          alt="templique-logo"
          onClick={refreshPage}
        />
      </div>
    </header>
  );
};

export default Header;
