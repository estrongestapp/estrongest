export default function Debug() {
    const info = localStorage.getItem('info');
     
    return (
        <>
            {info}
        </>
    )
}