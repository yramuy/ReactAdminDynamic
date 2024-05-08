// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Header = () => {
    const userRoleId = sessionStorage.getItem('userRoleId');

    let item = useSelector((state) => {
        return state.menuDetails;
    });
    
    return (
        <>
            {/* <!-- Navbar --> */}
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                {/* <!-- Left navbar links --> */}
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="index.php" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="#" class="nav-link">Contact</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Help
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">FAQ</a>
                            <a class="dropdown-item" href="#">Support</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Contact</a>
                        </div>
                    </li>
                </ul>

                {/* <!-- Right navbar links --> */}
                <ul class="navbar-nav ml-auto">
                    {
                        userRoleId === '1' || userRoleId === '3' ? (
                            <li class="nav-item">
                                <a class="nav-link" data-widget="fullscreen" href={`/addToCart/${item.itemDetails.id}`} role="button">
                                    <span class="position-relative">
                                        <i class="fas fa-cart-plus"></i> Cart
                                        <span class="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">{item.badge}</span>
                                    </span>
                                </a>
                            </li>
                        ) : ''
                    }
                    <li class="nav-item">
                        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" data-toggle="dropdown" href="#">
                            <i class="fa fa-cog" aria-hidden="true"></i>

                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <div class="dropdown-divider"></div>
                            <a href="/logout" class="dropdown-item">
                                <i class="fa fa-address-book mr-2" aria-hidden="true"></i> Logout
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item">
                                <i class="fa fa-user mr-2" aria-hidden="true"></i> User Profile
                            </a>
                            <div class="dropdown-divider"></div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#"
                            role="button">
                            <i class="fas fa-th-large"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;