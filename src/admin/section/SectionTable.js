import {Button, Col, Row} from "reactstrap";
import {useState} from "react";
import Search from "antd/es/input/Search";

const SectionTable = ({data, getSectionData, onSearch, toggleUpdate, deleteSectionItem, toggle, sectionName}) => {

    const {update, headers, info, body} = data

    const [search, setSearch] = useState("")


    return (
        <div>
            <Row>
                <Col>
                    {update ? <Button color='success' onClick={() => toggle(sectionName)}>
                        &#10009; Add {sectionName}
                    </Button> : ''}
                </Col>
                <Col sm={{size: 1, offset: 4}}>
                    {
                        search && <Button color='warning' className='text-white' onClick={() => {
                            getSectionData(0);
                            setSearch("")
                        }}>Clear</Button>
                    }
                </Col>
                <Col sm={4}>
                    <Search placeholder="Search..." onSearch={onSearch} enterButton/>
                </Col>
            </Row>
            <table className={"table mt-4 table-bordered table-hover table-striped"}>
                <thead>
                <tr>
                    {headers ? headers.map(head => <th key={head}>{head}</th>) : ''}
                </tr>
                </thead>
                <tbody>
                {body && body.content ? body.content.map(elm => {
                    return <tr key={elm.id}>
                        {data.headers.map(head => <td>{elm[head]}</td>)}
                        {
                            (data.delete || update || info) && <td>
                                {
                                    info && <Button color="secondary" className="m-1" onClick={() => toggleUpdate(elm.id)}>
                                        &#10066;
                                    </Button>
                                }
                                {
                                    update && <Button color="warning" className="m-1" onClick={() => toggleUpdate(elm.id)}>
                                        &#9998;
                                    </Button>
                                }
                                {
                                    data.delete && <Button color="danger" onClick={() => deleteSectionItem(elm.id)}>
                                        &#10006;
                                    </Button>
                                }
                            </td>
                        }
                    </tr>
                }) : ''}
                </tbody>
            </table>
        </div>
    );
}

export default SectionTable;