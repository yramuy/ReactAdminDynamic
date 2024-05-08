import { useEffect, useState } from "react";
import Layout from "../layout";
import { GetApiService, PostApiService } from "../api";
import { useDispatch, useSelector } from "react-redux";

const AddCheckList = () => {

    const [standard, setStandard] = useState([]);
    const [clauses, setClauses] = useState([]);
    const [standardId, setStandardId] = useState('');
    const [clauseId, setClauseId] = useState('');
    const [level, setLevel] = useState('');
    const [clauseNo, setClauseNo] = useState('');
    const [displayOrder, setDisplayOrder] = useState('');
    const [mainText, setMainText] = useState('');
    const [comment, setComment] = useState('');
    const [inputField, setInputField] = useState('');
    const [inputFieldType, setInputFieldType] = useState('');
    const [dataType, setDataType] = useState('');
    const [masterData, setMasterData] = useState('');
    const [commentField, setCommentField] = useState(false);
    const [fileUploadField, setFileUploadField] = useState(false);
    const [nonConformance, setNonConformance] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isMasterData, setIsMasterData] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isInputField, setIsInputField] = useState(false);

    useEffect(() => {
        GetStandards();
    }, []);

    const GetStandards = async () => {
        const url = '/CodelgneiterApis/App_Api/standards';
        await GetApiService(url).then((response) => {
            setStandard(response.standards);
        });
    }

    const handleStandard = (val) => {
        setStandardId(val);

        GetClausesById(val);
    }

    const GetClausesById = async (id) => {
        const url = '/CodelgneiterApis/App_Api/clauses';
        const body = JSON.stringify({
            id: id
        });

        await PostApiService(url, body).then((response) => {
            setClauses(response.clauses);
        });
    }

    const handleInputField = (e) => {
        setInputField(e.target.value);

        if (e.target.value === '1') {
            setIsInputField(true);
        } else {
            setIsInputField(false);
        }

    }

    const handleCommentFild = () => {
        setCommentField(!commentField);
    }

    const handleDataType = (e) => {
        setDataType(e.target.value);

        if (e.target.value === '4') {
            setIsMasterData(true);
        } else {
            setIsMasterData(false);
        }

    }

    const handleFileUpload = () => {
        setFileUploadField(!fileUploadField);
    }

    const handleNonConformance = () => {
        setNonConformance(!nonConformance);
    }

    const handleIsActive = () => {
        setIsActive(!isActive);
    }

    const handleCheckList = async (e) => {
        e.preventDefault();

        const url = '/CodelgneiterApis/App_Api/SaveCheckList';

        const body = JSON.stringify({
            standardId: standardId,
            clauseId: clauseId,
            level: level,
            clauseNo: clauseNo,
            displayOrder: displayOrder,
            mainText: mainText,
            comment: comment,
            inputField: inputField,
            inputFieldType: inputFieldType,
            dataType: dataType,
            masterData: masterData,
            commentField: commentField,
            fileUploadField: fileUploadField,
            nonConformance: nonConformance,
            isActive: isActive

        });

        await PostApiService(url, body).then((response) => {
            if (response.status == 200) {
                setLoading(false);
                setStandardId('');
                setClauseId('');
                setLevel('');
                setClauseNo('');
                setDisplayOrder('');
                setMainText('');
                setComment('');
                setInputField('');
                setCommentField(false);
                setFileUploadField(false);
                setNonConformance(false);
                setIsActive(false);
                setIsInputField(false);
            }
            dispatch({ type: "DISPLAYMSG", payload: response.message });
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 5000);
        });

        console.log("Body", body)
    }

    let message = useSelector((state) => {
        return state.menuDetails.message;
    });

    console.log(commentField)
    return (
        <Layout>
            <section class="content">
                <div class="container-fluid">
                    {loading && <div class="loader"></div>}
                    <div class="card card-info mt-1">
                        <div class="card-header">
                            <h3 class="card-title">Add CheckList</h3>
                        </div>
                        <form class="form-horizontal" method="post" id="category_form" onSubmit={handleCheckList}>
                            <div class="card-body">
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Standard <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" id="standard" name="standard" value={standardId} onChange={(e) => handleStandard(e.target.value)}>
                                            <option value="">--Select--</option>
                                            {
                                                standard.map((stand) => (
                                                    <option value={stand.id}>{stand.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Clause <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" id="clause" name="clause" value={clauseId} onChange={(e) => setClauseId(e.target.value)}>
                                            <option value="">--Select--</option>
                                            {
                                                clauses.map((clause) => (
                                                    <option value={clause.id}>{`${clause.clause_no}. ${clause.clause_main_text}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Level <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" id="clause" name="clause" value={level} onChange={(e) => setLevel(e.target.value)}>
                                            <option value="">--Select--</option>
                                            <option value="1">Level 1</option>
                                            <option value="2">Level 2</option>
                                            <option value="3">Level 3</option>
                                            <option value="4">Level 4</option>
                                            <option value="5">Level 5</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Clause No.<em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            id="clause_no"
                                            name="clause_no"
                                            value={clauseNo}
                                            onChange={(e) => setClauseNo(e.target.value)}
                                            placeholder="Clause No." required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Display Order</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                            id="display_order"
                                            name="display_order"
                                            value={displayOrder}
                                            onChange={(e) => setDisplayOrder(e.target.value)}
                                            placeholder="Display Order" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Clause Main Text<em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"
                                            id="main_text"
                                            name="main_text"
                                            rows="2"
                                            onChange={(e) => setMainText(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Sub Text/ Comments</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"
                                            id="comment"
                                            name="comment"
                                            rows="3"
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Input field required</label>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input"
                                            type="radio"
                                            value="1"
                                            checked={inputField === '1'}
                                            onChange={handleInputField}
                                        />
                                        <label class="form-check-label" for="inlineRadio1">Yes</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input"
                                            type="radio"
                                            value="2"
                                            checked={inputField === '2'}
                                            onChange={handleInputField}
                                        />
                                        <label class="form-check-label" for="inlineRadio2">No</label>
                                    </div>
                                </div>
                                {
                                    isInputField &&
                                    <><div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Input Field Type <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" value={inputFieldType} onChange={(e) => setInputFieldType(e.target.value)}>
                                                <option value="">--Select--</option>
                                                <option value="text">Textbox</option>
                                                <option value="checkbox">Checkbox</option>
                                                <option value="radio">Radio</option>
                                                <option value="dropdown">Dropdown</option>
                                                <option value="date">Date</option>
                                            </select>
                                        </div>
                                    </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Data Type <em class="star">*</em></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" value={dataType} onChange={handleDataType}>
                                                    <option value="">--Select--</option>
                                                    <option value="1">No Data</option>
                                                    <option value="2">Current Date</option>
                                                    <option value="3">Login user</option>
                                                    <option value="4"> Map to master Data</option>
                                                </select>
                                            </div>
                                        </div>
                                        {isMasterData && <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Map to Master Data <em class="star">*</em></label>
                                            <div class="col-sm-10">
                                                <select class="form-control" value={masterData} onChange={(e) => setMasterData(e.target.value)}>
                                                    <option value="">--Select--</option>
                                                    <option value="1">Option-1</option>
                                                    <option value="2">Option-2</option>
                                                </select>
                                            </div>
                                        </div>}


                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Is Comment Field Require?</label>

                                            <div class="col-sm-3" style={{ marginLeft: '20px' }}>
                                                <input class="form-check-input"
                                                    type="checkbox"
                                                    checked={commentField}
                                                    onChange={handleCommentFild}
                                                />
                                            </div>
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Is File upload Field Require?</label>

                                            <div class="col-sm-4">
                                                <input class="form-check-input"
                                                    type="checkbox"
                                                    checked={fileUploadField}
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Non Conformance</label>

                                            <div class="col-sm-3" style={{ marginLeft: '20px' }}>
                                                <input class="form-check-input"
                                                    type="checkbox"
                                                    checked={nonConformance}
                                                    onChange={handleNonConformance}
                                                />
                                            </div>

                                        </div>
                                    </>
                                }
                                <div class="form-group row">

                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Is Active</label>

                                    <div class="col-sm-4">
                                        <input class="form-check-input"
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={handleIsActive}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div class="card-footer">
                                <div class="py-2">
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <button type="submit" class="btn btn-info" name="btnCategory">Save</button>
                                        </div>
                                        <div class="col-sm-1">
                                            <a type="submit" class="btn btn-default" href="categoryList.php">Cancel</a>
                                        </div>
                                        {showSnackbar && <div className="alert alert-info col-sm-5" role="alert" style={{ marginLeft: '10em' }}>
                                            {message}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AddCheckList;