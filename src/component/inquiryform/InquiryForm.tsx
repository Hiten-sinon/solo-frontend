import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  submitInquiry,
  submitFinishingInquiry,
  submitSoloLearnInquiry,
} from "../../redux/slice/inquirySlice";
import TabbingDesign from "../Tabs/TabbingDesign";
import { useSearchParams } from "react-router-dom";

function InquiryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const inquiryState = useSelector((state: RootState) => state.inquiry);
  const { t } = useTranslation();

  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );

  /* ================= TAB CONTROL ================= */

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("construction");

  useEffect(() => {
    if (tabFromUrl === "design") setActiveTab("design");
    else if (tabFromUrl === "finishing") setActiveTab("finishing");
    else if (tabFromUrl === "solo") setActiveTab("solo");
    else setActiveTab("construction");
  }, [tabFromUrl]);

  /* ================= ERROR STATES ================= */

  const [constructionErrors, setConstructionErrors] = useState<any>({});
  const [finishingErrors, setFinishingErrors] = useState<any>({});
  const [soloErrors, setSoloErrors] = useState<any>({});

  /* ================= FORMS ================= */

  const [constructionForm, setConstructionForm] = useState({
    type: "internal",
    name: "",
    phone_number: "",
    place_of_residence: "",
    project_location: "",
    project_area: "",
    type_of_space: "",
    sketch_available: false,
    image: null as File | null,
  });

  const [finishingForm, setFinishingForm] = useState({
    type: "internal",
    name: "",
    phone_number: "",
    place_of_residence: "",
    project_location: "",
    site_area: "",
    vehicle_type: "",
  });

  const [soloForm, setSoloForm] = useState({
    type: "internal",
    full_name: "",
    phone_number: "",
    date_of_birth: "",
    place_of_residence: "",
    college_major: "",
    status: "",
    year_of_graduation: "",
    worked_in_finishing_field: false,
    project_location: "",
    site_area: "",
    vehicle_type: "",
  });

  /* ================= VALIDATION ================= */

  const isEmpty = (val: any) => !val || val.toString().trim() === "";

  const validateConstruction = () => {
    let errors: any = {};
    if (isEmpty(constructionForm.name)) errors.name = "Full name is required.";
    if (isEmpty(constructionForm.phone_number))
      errors.phone_number = "Phone number is required.";
    if (isEmpty(constructionForm.place_of_residence))
      errors.place_of_residence = "Residency is required.";
    if (isEmpty(constructionForm.project_location))
      errors.project_location = "Project location is required.";
    if (isEmpty(constructionForm.project_area))
      errors.project_area = "Project area is required.";
    if (isEmpty(constructionForm.type_of_space))
      errors.type_of_space = "Select type of space.";
    setConstructionErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateFinishing = () => {
    let errors: any = {};
    if (isEmpty(finishingForm.name)) errors.name = "Full name is required.";
    if (isEmpty(finishingForm.phone_number))
      errors.phone_number = "Phone number is required.";
    if (isEmpty(finishingForm.place_of_residence))
      errors.place_of_residence = "Residency is required.";
    if (isEmpty(finishingForm.project_location))
      errors.project_location = "Project location is required.";
    if (isEmpty(finishingForm.site_area))
      errors.site_area = "Project area is required.";
    if (isEmpty(finishingForm.vehicle_type))
      errors.vehicle_type = "Select vacuum type.";
    setFinishingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSolo = () => {
    let errors: any = {};
    if (isEmpty(soloForm.full_name)) errors.name = "Full name is required.";
    if (isEmpty(soloForm.phone_number))
      errors.phone_number = "Phone number is required.";
    if (isEmpty(soloForm.date_of_birth))
      errors.date_of_birth = "Date of birth is required.";
    if (isEmpty(soloForm.place_of_residence))
      errors.place_of_residence = "Place of residence is required.";
    if (isEmpty(soloForm.college_major))
      errors.college_major = "College/Major is required.";
    if (isEmpty(soloForm.status)) errors.status = "Status is required.";
    if (isEmpty(soloForm.year_of_graduation))
      errors.year_of_graduation = "Year of graduation is required.";
    setSoloErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT HANDLERS ================= */

  const handleConstructionSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateConstruction()) return;
    await dispatch(submitInquiry(constructionForm) as any);
  };

  const handleFinishingSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateFinishing()) return;
    await dispatch(submitFinishingInquiry(finishingForm) as any);
  };

  const handleSoloSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateSolo()) return;
    await dispatch(submitSoloLearnInquiry(soloForm) as any);
  };

  /* ================= UI ================= */

  return (
    <section className="inquiry-form-section">
      <Container>
        <h2>{t("InquiryForm.title")}</h2>
        {message && (
          <Alert
            variant={message.type}
            onClose={() => setMessage(null)}
            dismissible
            className="mt-2"
          >
            {message.text}
          </Alert>
        )}

        <Tabs defaultActiveKey="construction" id="tabbing-form" className="mb-3" activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "construction")}>
          {/* ---------------- CONSTRUCTION TAB ---------------- */}
          <Tab eventKey="construction" title={t("ConstructionWorkForm.title")} id="construction-het" className="mb-3">
            <div className="personal-info-box custruction-info-box">
              <Form onSubmit={handleConstructionSubmit}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="constructionFullName"
                    >
                      <Form.Label>
                        {t("ConstructionWorkForm.fullname")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder={t("ConstructionWorkForm.enter_name")}
                        value={constructionForm.name}
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            name: e.target.value,
                          })
                        }
                      />
                      {constructionErrors.name && (
                        <small className="text-danger">
                          {constructionErrors.name}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="constructionPhone">
                      <Form.Label>
                        {t("ConstructionWorkForm.phone_number")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder={t(
                          "ConstructionWorkForm.enter_phone_number"
                        )}
                        value={constructionForm.phone_number}
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            phone_number: e.target.value,
                          })
                        }
                      />
                      {constructionErrors.phone_number && (
                        <small className="text-danger">
                          {constructionErrors.phone_number}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="constructionResidency"
                    >
                      <Form.Label>
                        {t("ConstructionWorkForm.residency")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="place_of_residence"
                        placeholder={t("ConstructionWorkForm.enter_residency")}
                        value={constructionForm.place_of_residence}
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            place_of_residence: e.target.value,
                          })
                        }
                      />
                      {constructionErrors.place_of_residence && (
                        <small className="text-danger">
                          {constructionErrors.place_of_residence}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="constructionProjectLocation"
                    >
                      <Form.Label>
                        {t("ConstructionWorkForm.project_location")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="project_location"
                        placeholder={t(
                          "ConstructionWorkForm.enter_project_location"
                        )}
                        value={constructionForm.project_location}
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            project_location: e.target.value,
                          })
                        }
                      />
                      {constructionErrors.project_location && (
                        <small className="text-danger">
                          {constructionErrors.project_location}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="constructionProjectArea1">
                        {t("ConstructionWorkForm.project_area")}
                      </Form.Label>
                      <Row>
                        <Col md={12}>
                          <Form.Control
                            id="constructionProjectArea1"
                            type="number"
                            name="project_area_length"
                            placeholder={t(
                              "ConstructionWorkForm.enter_project_area"
                            )}
                            value={constructionForm.project_area}
                            onChange={(e) =>
                              setConstructionForm({
                                ...constructionForm,
                                project_area: e.target.value,
                              })
                            }
                          />
                        </Col>
                        {/* <Col md={4}>
                          <Form.Control
                            id="constructionProjectArea2"
                            type="number"
                            name="project_area_width"
                            placeholder={t(
                              "ConstructionWorkForm.enter_project_area"
                            )}
                            value={constructionForm.project_area}
                            onChange={(e) =>
                              setConstructionForm({
                                ...constructionForm,
                                project_area: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            id="constructionProjectArea3"
                            type="number"
                            name="project_area_height"
                            placeholder={t(
                              "ConstructionWorkForm.enter_project_area"
                            )}
                            value={constructionForm.project_area}
                            onChange={(e) =>
                              setConstructionForm({
                                ...constructionForm,
                                project_area: e.target.value,
                              })
                            }
                          />
                        </Col> */}
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3 radio-btn">
                      <Form.Label className="p-type">
                        {t("ConstructionWorkForm.type_of_space")}
                      </Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        id="constructionResidential"
                        label={t("ConstructionWorkForm.residential")}
                        name="constructionSpaceType"
                        value="residential"
                        checked={
                          constructionForm.type_of_space === "residential"
                        }
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            type_of_space: e.target.value,
                          })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="constructionAdministrative"
                        label={t("ConstructionWorkForm.administratitive")}
                        name="constructionSpaceType"
                        value="administrative"
                        checked={
                          constructionForm.type_of_space === "administrative"
                        }
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            type_of_space: e.target.value,
                          })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="constructionCommercial"
                        label={t("ConstructionWorkForm.commmercial")}
                        name="constructionSpaceType"
                        value="commercial"
                        checked={
                          constructionForm.type_of_space === "commercial"
                        }
                        onChange={(e) =>
                          setConstructionForm({
                            ...constructionForm,
                            type_of_space: e.target.value,
                          })
                        }
                      />
                      {constructionErrors.type_of_space && (
                        <small className="text-danger">
                          {constructionErrors.type_of_space}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} className="text-up mb-3">
                    <p>
                      <strong>{t("ConstructionWorkForm.note")} :</strong>{" "}
                      {t("ConstructionWorkForm.contruction_note")}
                    </p>
                  </Col>

                  <Col md={12} className="text-end">
                    <Button
                      className="btn btn-teal"
                      type="submit"
                      disabled={inquiryState.loading}
                    >
                      {inquiryState.loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("ConstructionWorkForm.submit")
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Tab>

          {/* ---------------- DESIGN TAB ---------------- */}
          <Tab eventKey="design" title={t("DesignWorkForm.title")} id="design-het">
            <TabbingDesign />
          </Tab>


          {/* ---------------- FINISHING TAB ---------------- */}
          <Tab eventKey="finishing" title={t("FinishingWorkForm.title")}>
            <div className="personal-info-box custruction-info-box">
              <Form onSubmit={handleFinishingSubmit}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="finishingFullName">
                      <Form.Label>
                        {t("FinishingWorkForm.full_name")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder={t("FinishingWorkForm.enter_name")}
                        value={finishingForm.name}
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            name: e.target.value,
                          })
                        }
                      />
                      {finishingErrors.name && (
                        <small className="text-danger">
                          {finishingErrors.name}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="finishingPhone">
                      <Form.Label>
                        {t("FinishingWorkForm.phone_number")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder={t("FinishingWorkForm.enter_phone_number")}
                        value={finishingForm.phone_number}
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            phone_number: e.target.value,
                          })
                        }
                      />
                      {finishingErrors.phone_number && (
                        <small className="text-danger">
                          {finishingErrors.phone_number}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="finishingResidency">
                      <Form.Label>
                        {t("FinishingWorkForm.residency")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="place_of_residence"
                        placeholder={t("FinishingWorkForm.enter_residency")}
                        value={finishingForm.place_of_residence}
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            place_of_residence: e.target.value,
                          })
                        }
                      />
                      {finishingErrors.place_of_residence && (
                        <small className="text-danger">
                          {" "}
                          {finishingErrors.place_of_residence}{" "}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="finishingProjectLocation"
                    >
                      <Form.Label>
                        {t("FinishingWorkForm.project_location")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="project_location"
                        placeholder={t(
                          "FinishingWorkForm.enter_project_location"
                        )}
                        value={finishingForm.project_location}
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            project_location: e.target.value,
                          })
                        }
                      />
                      {finishingErrors.project_location && (
                        <small className="text-danger">
                          {" "}
                          {finishingErrors.project_location}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="finishingProjectArea1">
                        {t("FinishingWorkForm.project_area")}
                      </Form.Label>
                      <Row>
                        <Col md={12}>
                          <Form.Control
                            id="finishingProjectArea1"
                            type="number"
                            name="site_area_length"
                            placeholder={t(
                              "FinishingWorkForm.enter_project_area"
                            )}
                            value={finishingForm.site_area}
                            onChange={(e) =>
                              setFinishingForm({
                                ...finishingForm,
                                site_area: e.target.value,
                              })
                            }
                          />
                        </Col>
                        {/* <Col md={4}>
                          <Form.Control
                            id="finishingProjectArea2"
                            type="number"
                            name="site_area_width"
                            placeholder={t(
                              "FinishingWorkForm.enter_project_area"
                            )}
                            value={finishingForm.site_area}
                            onChange={(e) =>
                              setFinishingForm({
                                ...finishingForm,
                                site_area: e.target.value,
                              })
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            id="finishingProjectArea3"
                            type="number"
                            name="site_area_height"
                            placeholder={t(
                              "FinishingWorkForm.enter_project_area"
                            )}
                            value={finishingForm.site_area}
                            onChange={(e) =>
                              setFinishingForm({
                                ...finishingForm,
                                site_area: e.target.value,
                              })
                            }
                          />
                        </Col> */}
                      </Row>

                      {finishingErrors.site_area && (
                        <small className="text-danger">
                          {finishingErrors.site_area}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3 radio-btn">
                      <Form.Label className="p-type">
                        {t("FinishingWorkForm.vacuum_type")}
                      </Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        id="finishingResidential"
                        label={t("FinishingWorkForm.residential")}
                        name="vehicle_type"
                        value="residential"
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            vehicle_type: e.target.value,
                          })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="finishingAdministrative"
                        label={t("FinishingWorkForm.administratitive")}
                        name="vehicle_type"
                        value="administrative"
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            vehicle_type: e.target.value,
                          })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="finishingCommercial"
                        label={t("FinishingWorkForm.commmercial")}
                        name="vehicle_type"
                        value="commercial"
                        onChange={(e) =>
                          setFinishingForm({
                            ...finishingForm,
                            vehicle_type: e.target.value,
                          })
                        }
                      />
                      {finishingErrors.vehicle_type && (
                        <small className="text-danger">
                          {" "}
                          {finishingErrors.vehicle_type}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={12} className="text-up mb-3">
                    <p>
                      <strong>{t("FinishingWorkForm.note")} :</strong>{" "}
                      {t("FinishingWorkForm.fininsh_work_note")}
                    </p>
                  </Col>
                  <Col md={12} className="text-end">
                    <Button
                      className="btn btn-teal"
                      type="submit"
                      disabled={inquiryState.loading}
                    >
                      {" "}
                      {inquiryState.loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("FinishingWorkForm.submit")
                      )}{" "}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Tab>

          {/* ---------------- SOLO LEARN TAB ---------------- */}
          <Tab eventKey="solo" title={t("SoloLearnForm.title")}>
            <div className="personal-info-box custruction-info-box">
              <Form onSubmit={handleSoloSubmit}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloFullName">
                      <Form.Label>{t("SoloLearnForm.full_name")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        placeholder={t("SoloLearnForm.enter_name")}
                        value={soloForm.full_name}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            full_name: e.target.value,
                          })
                        }
                      />
                      {soloErrors.name && (
                        <small className="text-danger">{soloErrors.name}</small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloPhone">
                      <Form.Label>{t("SoloLearnForm.phone_number")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder={t("SoloLearnForm.enter_phone_number")}
                        value={soloForm.phone_number}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            phone_number: e.target.value,
                          })
                        }
                      />
                      {soloErrors.phone_number && (
                        <small className="text-danger">
                          {soloErrors.phone_number}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloDOB">
                      <Form.Label>
                        {t("SoloLearnForm.date_of_birth")}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={soloForm.date_of_birth}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                      {soloErrors.date_of_birth && (
                        <small className="text-danger">
                          {soloErrors.date_of_birth}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloResidence">
                      <Form.Label>
                        {t("SoloLearnForm.place_of_residence")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="place_of_residence"
                        placeholder={t(
                          "SoloLearnForm.enter_place_of_residence"
                        )}
                        value={soloForm.place_of_residence}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            place_of_residence: e.target.value,
                          })
                        }
                      />
                      {soloErrors.place_of_residence && (
                        <small className="text-danger">
                          {soloErrors.place_of_residence}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloCollege">
                      <Form.Label>
                        {t("SoloLearnForm.college_major")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="college_major"
                        placeholder={t("SoloLearnForm.enter_college_major")}
                        value={soloForm.college_major}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            college_major: e.target.value,
                          })
                        }
                      />
                      {soloErrors.college_major && (
                        <small className="text-danger">
                          {soloErrors.college_major}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3 radio-btn">
                      <Form.Label className="p-type">
                        {t("SoloLearnForm.status")}
                      </Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        id="soloStudent"
                        label={t("SoloLearnForm.student")}
                        name="status"
                        value="student"
                        checked={soloForm.status === "student"}
                        onChange={(e) =>
                          setSoloForm({ ...soloForm, status: e.target.value })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="soloGraduate"
                        label={t("SoloLearnForm.graduate")}
                        name="status"
                        value="graduate"
                        checked={soloForm.status === "graduate"}
                        onChange={(e) =>
                          setSoloForm({ ...soloForm, status: e.target.value })
                        }
                      />
                      {soloErrors.status && (
                        <small className="text-danger">
                          {soloErrors.status}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="soloGraduation">
                      <Form.Label>
                        {t("SoloLearnForm.year_of_graduation")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="year_of_graduation"
                        placeholder={t(
                          "SoloLearnForm.enter_year_of_graduation"
                        )}
                        value={soloForm.year_of_graduation}
                        onChange={(e) =>
                          setSoloForm({
                            ...soloForm,
                            year_of_graduation: e.target.value,
                          })
                        }
                      />
                      {soloErrors.year_of_graduation && (
                        <small className="text-danger">
                          {soloErrors.year_of_graduation}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3 radio-btn">
                      <Form.Label className="p-type">
                        {t("SoloLearnForm.worked_in_finishing_field")}
                      </Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        id="soloWorkedYes"
                        label={t("SoloLearnForm.yes")}
                        name="worked_in_finishing_field"
                        checked={soloForm.worked_in_finishing_field === true}
                        onChange={() =>
                          setSoloForm({
                            ...soloForm,
                            worked_in_finishing_field: true,
                          })
                        }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="soloWorkedNo"
                        label={t("SoloLearnForm.no")}
                        name="worked_in_finishing_field"
                        checked={soloForm.worked_in_finishing_field === false}
                        onChange={() =>
                          setSoloForm({
                            ...soloForm,
                            worked_in_finishing_field: false,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="text-end">
                    <Button
                      className="btn btn-teal"
                      type="submit"
                      disabled={inquiryState.loading}
                    >
                      {inquiryState.loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("SoloLearnForm.submit")
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </Container >
    </section >
  );
}

export default InquiryForm;
