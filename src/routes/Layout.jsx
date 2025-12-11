export default function Layout ({ title, children }) {
    return (
        <div>
            <h1>{title}</h1>
            <div class="bg-bg">
                {children}
            </div>
        </div>
    )
}