
export default function Product () {
    return (
        <div className='flex justify-between py-5 px-5 h-30 text-xl w-full min-w-125'>
            <img src="/src/assets/face.png" alt=""/>
            <div className='flex flex-col mx-4 flex-14'>
                <p id='pName'>Name</p>
                <ul className='flex flex-2 justify-between items-end'>
                    <li id='pCat'>Category</li>
                    <li id='pBrand'>Brand</li>
                    <li id='pPrice'>Price</li>
                    <li id='pStock'>Stock</li>
                </ul>
            </div>
            <p className='bg-blue-500 w-13 text-center align-middle flex-2'>Edit</p>
        </div>
    )
}