import { useEffect, useState } from "react";
import Layout from "../layout";
import { GetApiService, PostApiService } from "../api";
import { useDispatch, useSelector } from "react-redux";

const ViewCheckList = () => {

    const [level1CheckList, setLevel1CheckList] = useState([]);
    const dispatch = useDispatch();
    // const [show, setShow] = useState(false);

    useEffect(() => {
        GetLevel1CheckList();
    }, []);

    const GetLevel1CheckList = async () => {
        const url = '/CodelgneiterApis/App_Api/checklist';
        const body = JSON.stringify({
            level: 1,
            standard: '',
            clause: ''
        });

        await PostApiService(url, body).then((response) => {
            setLevel1CheckList(response.level1CheckList);
        });
    }

    let checklistItem = useSelector((state) => {
        return state.menuDetails;
    });

    const handleLevel = (val, id, clauseId) => {
        dispatch({ type: "CHECKLIST", payload: { clauseNo: val, id: id, clauseId: clauseId } });
    }



    console.log('checklistItem', checklistItem)

    return (
        <Layout>
            <section class="content">
                <div class="container-fluid">

                    <div class="card card-info mt-1">
                        <div class="card-header mt-1">
                            <h3 class="card-title">CheckList Items</h3>
                        </div>
                        <div class="card-body mt-1">
                            <div class="accordion-Container">
                                <div class="multi-open">
                                    {
                                        level1CheckList.map((level1) => (
                                            <div class="tab">
                                                <input id={level1.id} type="checkbox" name="tabs" className="inputtab" />
                                                <label for={level1.id} class="acTab">{level1.clause_no}. {level1.clause_main_text}</label>
                                                <div class="tab-content">
                                                    <div id="ticket">
                                                        <div class="card card-body">
                                                            {
                                                                level1.level2CheckList.map((level2) => (
                                                                    <div class="tab">
                                                                        <input id={level2.id} type="checkbox" name="tabs" className="inputtab" />
                                                                        <label for={level2.id} class="acTab">{level2.clause_no}. {level2.clause_main_text}</label>
                                                                        <div class="tab-content">
                                                                            <div id="ticket">

                                                                                {
                                                                                    level2.input_field_required === "1" ? (

                                                                                        <div class="card card-body">


                                                                                            <div class="form-group row">
                                                                                                <label for="inputEmail3" class="col-sm-2 col-form-label">Input Field</label>
                                                                                                <div class="col-sm-10">
                                                                                                    {
                                                                                                        level2.input_field_type === 'dropdown' ? (
                                                                                                            <select class="form-control" id="standard" name="standard" >
                                                                                                                <option value="">--Select--</option>
                                                                                                                {
                                                                                                                    level2.dropdownData.map((drop) => (
                                                                                                                        <option value={drop.id}>{drop.name}</option>
                                                                                                                    ))
                                                                                                                }
                                                                                                            </select>
                                                                                                        ) : (<input type="text" class="form-control"
                                                                                                            id="display_order"
                                                                                                            name="display_order" />)
                                                                                                    }

                                                                                                </div>
                                                                                            </div>


                                                                                            {
                                                                                                level2.is_comment_require === '1' ? (
                                                                                                    <div class="form-group row">
                                                                                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Comment</label>
                                                                                                        <div class="col-sm-10">
                                                                                                            <textarea class="form-control"
                                                                                                                id="comment"
                                                                                                                name="comment"
                                                                                                                rows="3"
                                                                                                            ></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ) : ''
                                                                                            }
                                                                                            {
                                                                                                level2.is_upload_file_require === "1" ? (
                                                                                                    <div class="form-group row">
                                                                                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Attachment</label>
                                                                                                        <div class="col-sm-10">
                                                                                                            <input type="file" class="form-control" />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ) : ''
                                                                                            }
                                                                                            {
                                                                                                level2.non_conformative === "1" ? (
                                                                                                    <div class="form-group row">
                                                                                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Non Conformance</label>

                                                                                                        <div class="col-sm-6" style={{ marginLeft: '20px' }}>
                                                                                                            <input class="form-check-input"
                                                                                                                type="checkbox"

                                                                                                            />
                                                                                                        </div>

                                                                                                    </div>
                                                                                                ) : ''
                                                                                            }
                                                                                        </div>
                                                                                    ) : ''
                                                                                }

                                                                                {
                                                                                    level2.level3CheckList.map((level3) => (
                                                                                        <div class="tab">
                                                                                            <input id={level3.id} type="checkbox" name="tabs" className="inputtab" />
                                                                                            <label for={level3.id} class="acTab">{level3.clause_no}. {level3.clause_main_text}</label>
                                                                                            <div class="tab-content">
                                                                                                <div id="ticket">
                                                                                                    {
                                                                                                        level3.input_field_required === "1" ? (
                                                                                                            <div class="card card-body">
                                                                                                                <div class="form-group row">
                                                                                                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Input Field</label>
                                                                                                                    <div class="col-sm-10">
                                                                                                                        {
                                                                                                                            level3.input_field_type === 'dropdown' ? (
                                                                                                                                <select class="form-control" id="standard" name="standard" >
                                                                                                                                    <option value="">--Select--</option>
                                                                                                                                    {
                                                                                                                                        level3.dropdownData.map((drop) => (
                                                                                                                                            <option value={drop.id}>{drop.name}</option>
                                                                                                                                        ))
                                                                                                                                    }
                                                                                                                                </select>
                                                                                                                            ) : (
                                                                                                                                <input type="text" class="form-control"
                                                                                                                                    id="display_order"
                                                                                                                                    name="display_order" />
                                                                                                                            )
                                                                                                                        }

                                                                                                                    </div>
                                                                                                                </div>


                                                                                                                {
                                                                                                                    level3.is_comment_require === '1' ? (
                                                                                                                        <div class="form-group row">
                                                                                                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Comment</label>
                                                                                                                            <div class="col-sm-10">
                                                                                                                                <textarea class="form-control"
                                                                                                                                    id="comment"
                                                                                                                                    name="comment"
                                                                                                                                    rows="3"
                                                                                                                                ></textarea>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    ) : ''
                                                                                                                }
                                                                                                                {
                                                                                                                    level3.is_upload_file_require === "1" ? (
                                                                                                                        <div class="form-group row">
                                                                                                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Attachment</label>
                                                                                                                            <div class="col-sm-10">
                                                                                                                                <input type="file" class="form-control" />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    ) : ''
                                                                                                                }
                                                                                                                {
                                                                                                                    level3.non_conformative === "1" ? (
                                                                                                                        <div class="form-group row">
                                                                                                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Non Conformance</label>

                                                                                                                            <div class="col-sm-6" style={{ marginLeft: '20px' }}>
                                                                                                                                <input class="form-check-input"
                                                                                                                                    type="checkbox"

                                                                                                                                />
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    ) : ''
                                                                                                                }
                                                                                                            </div>
                                                                                                        ) : ''
                                                                                                    }

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }



                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ViewCheckList;