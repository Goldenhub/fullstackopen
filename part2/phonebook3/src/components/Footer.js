const Footer = () => {
    const footerStyle = {
        colort: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div className={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}

export default Footer;