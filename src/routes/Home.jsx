import Layout from './Layout';
import "../index.css";
import MenuBar from '../components/MenuBar';
import Product from '../components/Product';

export default function Home () {
    return (
    <>
        <div className='fixed top-0 left-0 w-full z-50'>
            <MenuBar/>
        </div>
        <Layout>
            <div className='flex flex-wrap gap-4 pt-20 px-10 pb-5'>
                <div className='flex flex-1 flex-wrap gap-4 h-full sticky top-20 bg-bg'>
                    {/* Filtros */}
                    <form action="" className='flex justify-between py-4 px-3 bg-gray-700 rounded-xl h-full w-full'>
                        <button type="button" className='bg-button-bg px-3 py-1 rounded-lg font-bold'>FILTROS</button>
                        <input type="text" className='bg-input text-red rounded-md' placeholder='Insete filtro' />
                        <button type="button" className='bg-button-add px-3 rounded-lg font-bold'>+</button>
                    </form>
                    {/* Categorias */}
                    <div className='flex flex-col py-5 px-5 min-w-125 bg-gray-500 rounded-2xl justify-around h-full w-full'>
                        {
                            Array.from({length: 4}).map((_, index) => (
                                <div key={index} className='flex flex-1 justify-between my-2 rounded-lg p-2'>
                                    {
                                        Array.from({length: 3}).map((_, subIndex) => (
                                            <p key={subIndex} className='flex-1 text-center'>Category {subIndex + 1}</p>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* Productos */}
                <div className='flex flex-10 gap-5 flex-wrap py-5 px-5 min-w-125 bg-gray-700 rounded-2xl overflow-y-auto'>
                    {
                        Array.from({length: 51}).map((_, index) => (
                            <div key={index} className='flex-1 bg-slate-900 rounded-3xl'>
                                <Product/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    </>
    )
}