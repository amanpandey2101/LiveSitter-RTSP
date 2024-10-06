

const Footer = () => {
  return (
    <div className="flex flex-wrap items-center md:justify-between justify-center">
    <div className="w-full px-4 mx-auto text-center">
      <div className="text-sm text-blueGray-500 font-semibold py-1 text-black">
        Copyright © <span id="get-current-year">2024</span><a className=" text-black" > made by </a>
        <a href="https://github.com/amanpandey2101" className="text-blueGray-500 hover:text-blueGray-800">Aman Kumar Pandey</a>
      </div>
    </div>
  </div>
  )
}

export default Footer