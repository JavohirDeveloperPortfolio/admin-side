import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {Layout} from 'antd';
import './main.css'
import SectionTable from "../section/SectionTable";
import Permission from "../settings/permission";
import CourseAddModal from "../course/CourseAddModal";
import GroupAddModal from "../group/GroupAddModal";
import {connect} from "react-redux";
import logo from '../../utils/img/logo.png'
import {getMe} from "../../store/reducer/user";

import {
    getMenuList,
    getDataWithPage,
    addCourse,
    deleteSectionItem,
} from "../../store/reducer/data";
import {CardMedia} from "@mui/material";

const {Header, Content, Sider} = Layout;

function Main({
                  menuList,
                  pages,
                  authorization,
                  sectionData,
                  getDataWithPage,
                  getMenuList,
                  addCourse,
                  getMe,
                  deleteSectionItem
              }) {

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(0);
    const [courseModalOpen, setCourseModalOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [currentSectionName, setCurrentSectionName] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const [idForActiveMenu, setId] = useState(0);


    const handleClick = (menu) => {
        setId(menu.id)
        setCurrentSectionName(menu.sectionName);
        if (menu.sectionName === 'permission')
            return;
        getDataWithPage(menu.id, currentPage)
    }

    function getSectionData(hasNext) {
        let helper = currentPage + hasNext;
        getDataWithPage(idForActiveMenu, helper)
        if (helper >= 0 && pages >= helper)
            setCurrentPage(helper)
    }


    function toggle(sectionName) {
        if (sectionName.toLowerCase() === "course") {
            setCourseModalOpen(!courseModalOpen)
        } else if (sectionName.toLowerCase() === "group") {
            setGroupModalOpen(!groupModalOpen)
        }

    }

    function deleteSectionItemById(item_id){
        deleteSectionItem(currentSectionName,item_id)
    }


    useEffect(() => {
        getMe()
        getMenuList()
        let token = localStorage.getItem("access-token")
        if (authorization || !token || !token.startsWith('Bearer'))
            navigate('/')
    }, [])

    useEffect(() => {
        let token = localStorage.getItem("access-token")
        if (authorization || !token || !token.startsWith('Bearer'))
            navigate('/')
    }, [authorization])


    useEffect(() => {
        if (menuList[0]) {
            getDataWithPage(menuList[0].id, currentPage)
            setCurrentSectionName(menuList[0].sectionName)
        }
    }, [menuList])


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="row m-2 ">
                    <div className={collapsed ? 'col-md-12' : "col-md-4"}>
                        <CardMedia
                            component="img"
                            sx={{width: '100%', display: {xs: 'none', sm: 'block'}, marginLeft: 'auto'}}
                            image={logo}
                            alt={'?'}
                        />
                    </div>
                    <div className="col-md-4">
                        <div className={collapsed ? 'text-white d-none' : 'text-white'} style={{fontSize: '20px'}}>
                            <p>Oliy Mahad</p>
                        </div>
                    </div>
                    <hr className={collapsed ? 'mt-2 text-white' : 'text-white'}/>
                </div>
                <ul className='p-4'>
                    {
                        menuList && menuList
                            .map(menu => <li
                                    className={currentSectionName && currentSectionName === menu.sectionName ? 'p-2 pb-5 rounded bg-primary my-1' : 'p-2 pb-5 rounded my-1'}
                                    key={'menu' + menu.id}
                                    style={{backgroundColor: "#387"}}
                                    onClick={() => handleClick(menu)}>
                                    {collapsed ? menu.sectionName.toUpperCase().substring(0, 1) : menu.sectionName.toUpperCase()}
                                </li>
                            )}
                </ul>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content>
                    {
                        currentSectionName === 'permission' ? <Permission/> :
                            sectionData && <SectionTable data={sectionData}
                                                         getSectionData={getSectionData}
                                                         toggle={toggle}
                                                         deleteSectionItem={deleteSectionItemById}
                                                         sectionName={currentSectionName ? currentSectionName : menuList[0] ? menuList[0].sectionName : ''}
                            />
                    }
                    <div className="row m-3">
                        <div className="col-md-12 text-end">
                            <div className="btn-group">
                                <button disabled={currentPage === 0} className={"btn btn-outline-primary"}
                                        onClick={() => getSectionData(-1)}>prev
                                </button>
                                <button className={"btn btn-primary"}>{currentPage}</button>

                                <button disabled={currentPage === pages - 1} className={"btn btn-outline-primary"}
                                        onClick={() => getSectionData(1)}>next
                                </button>
                            </div>
                            {courseModalOpen && <CourseAddModal toggle={toggle} addCourse={addCourse} getSectionData={getSectionData}/>}
                            {groupModalOpen && <GroupAddModal toggle={toggle} getSectionData={getSectionData}/>}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default connect(({data: {sectionData, menuList, pages, isNotAuthorization},user:{authorization}}) => ({
        sectionData,
        menuList,
        pages,
        isNotAuthorization
    }),
    {getDataWithPage, getMenuList, addCourse, getMe,deleteSectionItem})(Main);