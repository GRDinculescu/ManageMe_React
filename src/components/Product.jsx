export default function Product () {
    return (
        <div className='flex justify-between py-5 px-5 h-30 text-xl w-full min-w-125'>
            <img src="/src/assets/face.png" alt=""/>
            <div className='flex flex-col mx-5 mr-7.5 flex-14'>
                <p id='pName'>Name</p>
                <ul className='flex flex-2 justify-between items-end'>
                    <li id='pCat'>Category</li>
                    <li id='pBrand'>Brand</li>
                    <li id='pPrice'>Price</li>
                    <li id='pStock'>Stock</li>
                </ul>
            </div>
            <button className="bg-sky-500 min-w-30 min-h-20 rounded-2xl">EDITAR</button>
        </div>
    )
}