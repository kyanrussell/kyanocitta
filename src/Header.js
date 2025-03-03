const gitSha = process.env.REACT_APP_GIT_SHA || "unknown";

function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white text-center">
      ver. {gitSha}
    </header>
  );
}
 export default Header;
