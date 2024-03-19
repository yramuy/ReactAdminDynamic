import { useEffect, useState } from "react";
import { GetApiService, PostApiService } from "../api";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const [isActive, setIsActive] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const loginUser = sessionStorage.getItem('userName');
    const loginUserId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const [catList, setCatList] = useState([]);
    const [subcatList, setSubcatList] = useState([]);
    const [catId, setCatId] = useState('');
    const [subcatId, setSubcatId] = useState('');
    const [lev3Id, setLev3Id] = useState('');

    const navigate = useNavigate();

    const handleClick = () => {
        setIsActive(!isActive);
    }
    const handleConfig = (value) => {
        setCatId(value);
    }
    const handleSubcat = (subid) => {
        setSubcatId(subid);
    }

    const handleLevel3 = (level3_id) => {
        setLev3Id(level3_id);
    }

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        const url = "/BillsPayeApis/v1/dynamicMenus";
        await GetApiService(url).then((data) => {
            setCatList(data.level1menus);
        });
    }

    const renderSubcategories = (level2menus) => {
        return (
            <ul class="nav nav-treeview">
                {level2menus.map(subcategory => (
                    <li key={subcategory.sub_category_id} className={subcategory.sub_category_id === subcatId ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleSubcat(subcategory.sub_category_id)}>
                        <a href="#" className={subcategory.sub_category_id === subcatId ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L2', subcategory.sub_category_id)}>
                            <i class="far fa-compass nav-icon"></i>
                            <p>
                                {subcategory.sub_category_name}
                                {subcategory.level3menus.length > 0 ? (<i class="right fas fa-angle-left"></i>) : ""}
                            </p>
                        </a>
                        {renderLevel3Menus(subcategory.level3menus)}

                    </li>
                ))}
            </ul>

        );
    }

    const renderLevel3Menus = (level3menus) => {
        return (
            <ul class="nav nav-treeview">
                {level3menus.map((menu) => (
                    <li class="nav-item" key={menu.level3_id} onClick={() => handleLevel3(menu.level3_id)}>
                        <a href="#" className={menu.level3_id === lev3Id ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L3', menu.level3_id)}>
                            <i class="far fa-dot-circle nav-icon"></i>
                            <p>{menu.child_sub_name}</p>
                        </a>
                    </li>
                ))}

            </ul>
        );
    }

    const handleMenu = (e, val, id) => {
        e.preventDefault();
        console.log(val)
        sessionStorage.setItem("Level", val);
        navigate(`/menu/${id}`);
    }

    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="index3.html" class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
                    <span class="brand-text font-weight-light">REACT ADMIN</span>
                </a>

                {/* <!-- Sidebar --> */}
                <div class="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">{loginUser}</a>
                        </div>
                    </div>

                    {/* <!-- SidebarSearch Form --> */}
                    <div class="form-inline">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div class="input-group-append">
                                <button class="btn btn-sidebar">
                                    <i class="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Sidebar Menu --> */}
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li class="nav-item">
                                <a href="/" class="nav-link">
                                    <i class="nav-icon fas fa-home"></i>
                                    <p>
                                        Home
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/users" class="nav-link">
                                    <i class="nav-icon fas fa-users"></i>
                                    <p>
                                        Users
                                    </p>
                                </a>
                            </li>
                            {
                                catList.map((cat, index) =>
                                (
                                    <li className={cat.id === catId ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleConfig(cat.id)}>
                                        <a href="" className={cat.id === catId ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L1', cat.id)}>
                                            <i class="nav-icon fas fa-tachometer-alt"></i>
                                            <p>{cat.name}{cat.level2menus.length > 0 ? (<i class="right fas fa-angle-left"></i>) : ''}</p>
                                        </a>
                                        {renderSubcategories(cat.level2menus)}
                                    </li>
                                ))
                            }

                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    );
};

export default Sidebar;