import { memo } from "react";

function Header () {
    return (
        <div className='flex flex-col w-full items-center  pt-[40px]'>
            <h1 className='text-3xl flex justify-center'>Our Products</h1>
            <p>Thoughtfully designed essentials for a better day</p>
        </div>
    );
}

export default memo(Header);