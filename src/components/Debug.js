export default function Debug() {
    const info = localStorage.getItem('info') || 'null';
     
    return (
        <>
            {info}
        </>
    )
}