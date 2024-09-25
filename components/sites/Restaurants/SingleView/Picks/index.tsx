
const Picks = () => {
  return (
    <div className=" mt-6">
      <h3 className=" text-[18px] font-semibold">Restaurant Picks</h3>
      <p className=" text-[14px] text-gray-500">Get 50% off selected items - T&Cs apply</p>

      <div className=" mt-6 grid grid-cols-12 gap-4">
        <div className=" relative col-span-12 bg-white shadow-md md:col-span-6 lg:col-span-3">
          <div className=" border-b-4 border-red-500">
            <img
              src="/assets/images/homepage/grocery-bag.jpg"
              alt="/"
              className="h-[110px] w-full"
            />
          </div>
          <div className=" absolute left-2 top-2 h-[30px] w-[50px] rounded-sm bg-red-500 p-1 text-center text-[14px] text-white">
            50%
          </div>
          <div className=" p-2">
            <h4 className=" my-1 font-semibold">Margherita</h4>
            <p className=" text-[12px] text-gray-500">Tomato sauce, (vg)</p>
            <p className=" text-[12px] text-gray-500">mozzarilla, fresh basil and</p>
            <div className=" mt-2 text-[14px]"><span className=" mr-2 text-[#eb8394]">$7.98 </span><del>$15.95</del> <span className=" ml-2 text-[#da9d58]">Popular</span></div>
          </div>
        </div>

        <div className=" relative col-span-12 bg-white shadow-md md:col-span-6 lg:col-span-3">
          <div className=" border-b-4 border-red-500">
            <img
              src="/assets/images/homepage/grocery-bag.jpg"
              alt="/"
              className="h-[110px] w-full"
            />
          </div>
          <div className=" absolute left-2 top-2 h-[30px] w-[50px] rounded-sm bg-red-500 p-1 text-center text-[14px] text-white">
            50%
          </div>
          <div className=" p-2">
            <h4 className=" my-1 font-semibold">Margherita</h4>
            <p className=" text-[12px] text-gray-500">Tomato sauce, (vg)</p>
            <p className=" text-[12px] text-gray-500">mozzarilla, fresh basil and</p>
            <div className=" mt-2 text-[14px]"><span className=" mr-2 text-[#eb8394]">$7.98 </span><del>$15.95</del> <span className=" ml-2 text-[#da9d58]">Popular</span></div>
          </div>
        </div>

        <div className=" relative col-span-12 bg-white shadow-md md:col-span-6 lg:col-span-3">
          <div className=" border-b-4 border-red-500">
            <img
              src="/assets/images/homepage/grocery-bag.jpg"
              alt="/"
              className="h-[110px] w-full"
            />
          </div>
          <div className=" absolute left-2 top-2 h-[30px] w-[50px] rounded-sm bg-red-500 p-1 text-center text-[14px] text-white">
            50%
          </div>
          <div className=" p-2">
            <h4 className=" my-1 font-semibold">Margherita</h4>
            <p className=" text-[12px] text-gray-500">Tomato sauce, (vg)</p>
            <p className=" text-[12px] text-gray-500">mozzarilla, fresh basil and</p>
            <div className=" mt-2 text-[14px]"><span className=" mr-2 text-[#eb8394]">$7.98 </span><del>$15.95</del> <span className=" ml-2 text-[#da9d58]">Popular</span></div>
          </div>
        </div>

        <div className=" relative col-span-12 bg-white shadow-md md:col-span-6 lg:col-span-3">
          <div className=" border-b-4 border-red-500">
            <img
              src="/assets/images/homepage/grocery-bag.jpg"
              alt="/"
              className="h-[110px] w-full"
            />
          </div>
          <div className=" absolute left-2 top-2 h-[30px] w-[50px] rounded-sm bg-red-500 p-1 text-center text-[14px] text-white">
            50%
          </div>
          <div className=" p-2">
            <h4 className=" my-1 font-semibold">Margherita</h4>
            <p className=" text-[12px] text-gray-500">Tomato sauce, (vg)</p>
            <p className=" text-[12px] text-gray-500">mozzarilla, fresh basil and</p>
            <div className=" mt-2 text-[14px]"><span className=" mr-2 text-[#eb8394]">$7.98 </span><del>$15.95</del> <span className=" ml-2 text-[#da9d58]">Popular</span></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Picks
