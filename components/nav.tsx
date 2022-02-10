import Link from "next/link";

const Nav = () => {
    return (
        <div className="topbar">
            <nav>
                <Link href='/'><a> &larr; Back</a></Link>
            </nav>
            {/* <Link href='/'><a> <i className="gg-profile"></i></a></Link> */}
        </div>
    )
}

export default Nav;