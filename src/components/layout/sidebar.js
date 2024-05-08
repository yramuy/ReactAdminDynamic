import { useEffect, useState } from "react";
import { GetApiService, PostApiService } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {

    const [isActive, setIsActive] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const loginUser = sessionStorage.getItem('userName');
    const loginUserId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userRoleId = sessionStorage.getItem('userRoleId');
    const [catList, setCatList] = useState([]);
    const [li, setLi] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleClick = (val) => {
        setIsActive(!isActive);
        setLi(val);
    }
    const handleConfig = (value) => {

        dispatch({ type: "LEVEL1", payload: value });
    }
    const handleSubcat = (subid) => {

        dispatch({ type: "LEVEL2", payload: subid });
    }

    const handleLevel3 = (level3_id) => {

        dispatch({ type: "LEVEL3", payload: level3_id });
    }

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        const url = "/AdminApis/v1/dynamicMenus";
        await GetApiService(url).then((data) => {
            setCatList(data.level1menus);
        });
    }

    let MenuIds = useSelector((state) => {
        return state.menuDetails;
    });

    console.log("Menu Ids", MenuIds);



    const renderSubcategories = (level2menus) => {
        return (
            <ul class="nav nav-treeview">
                {level2menus.map(subcategory => (
                    <li key={subcategory.sub_category_id} className={subcategory.sub_category_id === MenuIds.level2Id ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleSubcat(subcategory.sub_category_id)}>
                        <a href="#" className={subcategory.sub_category_id === MenuIds.level2Id ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L2', subcategory.sub_category_id, subcategory.sub_category_name, subcategory.level3menus.length)}>
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
                        <a href="#" className={menu.level3_id === MenuIds.level3Id ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L3', menu.level3_id, menu.child_sub_name, 0)}>
                            <i class="far fa-dot-circle nav-icon"></i>
                            <p>{menu.child_sub_name}</p>
                        </a>
                    </li>
                ))}

            </ul>
        );
    }

    const handleMenu = (e, val, id, menu, menuLength) => {
        e.preventDefault();
        console.log(val)
        sessionStorage.setItem("Level", val);
        if (val === "L2") {
            sessionStorage.setItem("subCat", menu);
        } else {
            sessionStorage.setItem("childSubcat", menu);
        }

        if (val === "L1" && menuLength <= 0 || val === "L2" && menuLength <= 0 || val === "L3" && menuLength <= 0) {
            navigate(`/menu/${id}`);
        }

    }

    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="index3.html" class="brand-link">
                    <img src="http://localhost/BillsPaye/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
                    <span class="brand-text font-weight-light">REACT ADMIN</span>
                </a>

                {/* <!-- Sidebar --> */}
                <div class="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="http://192.168.235.39/POSH/v1/default-photo.png" class="img-circle elevation-2" alt="User Image" />
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
                                userRoleId === "1" || userRoleId === "2" ? (
                                    <>
                                        <li className={li === 'Li1' || (location.pathname == '/addTimesheet') || (location.pathname == '/saveTimesheetItem') ? "nav-item menu-open" : "nav-item"} onClick={() => handleClick('Li1')}>
                                            <a href="#" class={li === 'Li1' || (location.pathname == '/addTimesheet') || (location.pathname == '/saveTimesheetItem') ? "nav-link active" : "nav-link"}>
                                                <i class="fas fa-tachometer-alt nav-icon"></i>
                                                <p>
                                                    Timesheet
                                                    <i class="right fas fa-angle-left"></i>
                                                </p>
                                            </a>
                                            <ul class="nav nav-treeview">
                                                <li class="nav-item">
                                                    <a href="/addTimesheet" class={location.pathname == '/addTimesheet' ? "nav-link active" : "nav-link"}>
                                                        <i class="nav-icon fas fa-plus"></i>
                                                        <p>
                                                            Add Timesheet
                                                        </p>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="/saveTimesheetItem" class={location.pathname == '/saveTimesheetItem' ? "nav-link active" : "nav-link"}>
                                                        <i class="nav-icon fas fa-running"></i>
                                                        <p>
                                                            Run Timesheet
                                                        </p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={li === 'Li2' || (location.pathname == '/addCheckList') || (location.pathname == '/viewCheckList') ? "nav-item menu-open" : "nav-item"} onClick={() => handleClick('Li2')}>
                                            <a href="#" class={li === 'Li2' || (location.pathname == '/addCheckList') || (location.pathname == '/viewCheckList') ? "nav-link active" : "nav-link"}>
                                                <i class="fas fa-th-list nav-icon"></i>
                                                <p>
                                                    Check List
                                                    <i class="right fas fa-angle-left"></i>
                                                </p>
                                            </a>
                                            <ul class="nav nav-treeview">
                                                <li class="nav-item">
                                                    <a href="/addCheckList" class={location.pathname == '/addCheckList' ? "nav-link active" : "nav-link"}>
                                                        <i class="nav-icon fas fa-plus-circle"></i>
                                                        <p>
                                                            Add CheckList
                                                        </p>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="/viewCheckList" class={location.pathname == '/viewCheckList' ? "nav-link active" : "nav-link"}>
                                                        <i class="nav-icon fas fa-ellipsis-v"></i>
                                                        <p>
                                                            View CheckList
                                                        </p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </>

                                ) : ''
                            }


                            {
                                userRoleId === "1" || userRoleId === "3" ? (
                                    catList.map((cat, index) =>
                                    (
                                        <li className={cat.id === MenuIds.level1Id ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleConfig(cat.id)}>
                                            <a href="" className={cat.id === MenuIds.level1Id ? 'nav-link active' : 'nav-link'} onClick={(e) => handleMenu(e, 'L1', cat.id, cat.name, cat.level2menus.length)}>
                                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                                <p>{cat.name}{cat.level2menus.length > 0 ? (<i class="right fas fa-angle-left"></i>) : ''}</p>
                                            </a>
                                            {renderSubcategories(cat.level2menus)}
                                        </li>
                                    ))
                                ) : ''

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