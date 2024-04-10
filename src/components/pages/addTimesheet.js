import { useEffect, useState } from "react";
import Layout from "../layout";
import { GetApiService, PostApiService } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddTimesheet = () => {

    const [employees, setEmployees] = useState([]);
    const [emplyee, setEmployee] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetEmployees();
    }, []);

    const GetEmployees = () => {
        const url = '/CodelgneiterApis/App_Api/employees';
        GetApiService(url).then((response) => {
            console.log(response)
            setEmployees(response.employees);
        });
    }

    const saveTimesheet = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = '/CodelgneiterApis/App_Api/addTimesheet';
        const body = JSON.stringify({
            emp_number: emplyee,
            from_date: fromDate,
            to_date: toDate
        });

        await PostApiService(url, body).then((response) => {
            setEmployee("");
            setFromDate("");
            setToDate("");
            if(response.statusCode == 200) {
                setLoading(false);
            }
            dispatch({ type: "DISPLAYMSG", payload: response.message });
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 5000);
            navigate('/addTimesheet');
        });

        console.log("body", body);
    }

    let message = useSelector((state) => {
        return state.menuDetails.message;
    });

    return (
        <Layout>

            <section class="content">
                <div class="container-fluid">
                {loading && <div class="loader"></div>}
                    <div class="card card-info mt-1">
                        <div class="card-header">
                            <h3 class="card-title">Add Timesheet</h3>
                        </div>
                        {/* <!-- /.card-header -->
                        <!-- form start --> */}
                        <form class="form-horizontal" method="post" id="category_form" onSubmit={saveTimesheet}>
                            <div class="card-body">
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Employee <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <select class="form-control" id="employee" name="employee" value={emplyee} onChange={(e) => setEmployee(e.target.value)} required>
                                            <option value="">--Select--</option>
                                            {
                                                employees.map((emp) => (
                                                    <option value={emp.emp_number}>{emp.full_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">From Date <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <input type="date" class="form-control"
                                            id="from_date"
                                            name="from_date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">To Date <em class="star">*</em></label>
                                    <div class="col-sm-10">
                                        <input type="date" class="form-control"
                                            id="to_date"
                                            name="to_date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            placeholder="Distance" required />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- /.card-body --> */}
                            <div class="card-footer">
                                <div class="py-2">
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <button type="submit" class="btn btn-info" name="btnCategory">Save</button>
                                        </div>
                                        <div class="col-sm-0">
                                            <a type="submit" class="btn btn-default" href="categoryList.php">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /.card-footer --> */}
                        </form>
                    </div>
                    {/* <!-- /.card -->
                    <!-- /.row (main row) --> */}
                </div>
                {showSnackbar && <div className="alert alert-success position-fixed bottom-0 end-0" role="alert">
                    {message}
                </div>}
            </section>
            {/* <!-- /.content --> */}
        </Layout>
    );
};

export default AddTimesheet;