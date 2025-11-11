import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
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
  submitDesignInquiry,
  submitFinishingInquiry,
  submitSoloLearnInquiry,
} from "../../redux/slice/exteriorSlice";
import { ExteriourDesign } from "../../assets/images";

type DesignExamples = {
  [key: string]: string[];
};

function ExteriorForm() {
  const dispatch = useDispatch<AppDispatch>();
  const inquiryState = useSelector((state: RootState) => state.inquiry);
  const designExamples: DesignExamples = {
    Bohemian: [
      "/DesignFormPhotos/Bohemian/IMG_3174.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3175.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3176.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3177.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3178.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3180.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3181.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3182.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3183.JPEG",
      "/DesignFormPhotos/Bohemian/IMG_3184.JPEG",
    ],
    Classic: [
      "/DesignFormPhotos/Classic/IMG_3059.JPEG",
      "/DesignFormPhotos/Classic/IMG_3060.JPEG",
      "/DesignFormPhotos/Classic/IMG_3061.JPEG",
      "/DesignFormPhotos/Classic/IMG_3062.JPEG",
      "/DesignFormPhotos/Classic/IMG_3063.JPEG",
      "/DesignFormPhotos/Classic/IMG_3064.JPEG",
      "/DesignFormPhotos/Classic/IMG_3065.JPEG",
      "/DesignFormPhotos/Classic/IMG_3066.JPEG",
      "/DesignFormPhotos/Classic/IMG_3067.JPEG",
      "/DesignFormPhotos/Classic/IMG_3068.JPEG",
    ],
    Industrial: [
      "/DesignFormPhotos/Industrial/IMG_3154.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3155.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3156.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3157.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3158.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3159.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3160.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3161.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3162.JPEG",
      "/DesignFormPhotos/Industrial/IMG_3163.JPEG",
    ],
    Japandish: [
      "/DesignFormPhotos/Japndi/IMG_3039.JPG",
      "/DesignFormPhotos/Japndi/IMG_3040.JPG",
      "/DesignFormPhotos/Japndi/IMG_3041.JPG",
      "/DesignFormPhotos/Japndi/IMG_3042.JPG",
      "/DesignFormPhotos/Japndi/IMG_3044.JPG",
      "/DesignFormPhotos/Japndi/IMG_3045.JPG",
      "/DesignFormPhotos/Japndi/IMG_3046.JPG",
      "/DesignFormPhotos/Japndi/IMG_3047.JPG",
      "/DesignFormPhotos/Japndi/IMG_3048.JPG",
    ],
    Meditrranean: [
      "/DesignFormPhotos/Meditrranean/IMG_3135.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3136.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3137.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3138.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3139.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3140.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3141.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3142.JPEG",
      "/DesignFormPhotos/Meditrranean/IMG_3143.JPEG",
    ],
    Minimalism: [
      "/DesignFormPhotos/Minimalism/IMG_3022.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3023.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3024.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3025.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3026.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3027.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3028.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3029.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3030.JPEG",
      "/DesignFormPhotos/Minimalism/IMG_3031.JPEG",
    ],
    Modern: [
      "/DesignFormPhotos/Modern/IMG_3110.JPEG",
      "/DesignFormPhotos/Modern/IMG_3111.JPEG",
      "/DesignFormPhotos/Modern/IMG_3112.JPEG",
      "/DesignFormPhotos/Modern/IMG_3113.JPEG",
      "/DesignFormPhotos/Modern/IMG_3114.JPEG",
      "/DesignFormPhotos/Modern/IMG_3115.JPEG",
      "/DesignFormPhotos/Modern/IMG_3116.JPEG",
      "/DesignFormPhotos/Modern/IMG_3117.JPEG",
      "/DesignFormPhotos/Modern/IMG_3118.JPEG",
      "/DesignFormPhotos/Modern/IMG_3120.JPEG",
    ],
    Newclassic: [
      "/DesignFormPhotos/Newclassic/IMG_3079.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3080.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3081.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3082.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3083.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3084.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3085.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3086.JPEG",
      "/DesignFormPhotos/Newclassic/IMG_3087.JPEG",
    ],
    Scandinavian: [
      "/DesignFormPhotos/Scandinavian/IMG_3195.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3196.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3197.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3198.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3199.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3200.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3201.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3202.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3203.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3204.JPEG",
      "/DesignFormPhotos/Scandinavian/IMG_3205.JPEG",
    ],
  };
  const [activeDesignTab, setActiveDesignTab] = useState("personal");
  const [showModal, setShowModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const [constructionErrors, setConstructionErrors] = useState<{
    [key: string]: string;
  }>({});
  const [designErrors, setDesignErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [finishingErrors, setFinishingErrors] = useState<{
    [key: string]: string;
  }>({});
  const [soloErrors, setSoloErrors] = useState<{ [key: string]: string }>({});

  // Construction Work form
  const [constructionForm, setConstructionForm] = useState({
    type: "external",
    name: "",
    phone_number: "",
    place_of_residence: "",
    project_location: "",
    project_area: "",
    type_of_space: "",
    sketch_available: false,
    image: null as File | null,
  });

  // Design Work form
  const [designForm, setDesignForm] = useState({
    type: "external",
    full_name: "",
    phone_number: "",
    city: "",
    project_location: "",
    project_type: "",
    area: "",
    preferred_colors: "",
    architectural_plan: false,
    number_of_users: "",
    age_range: "",
    special_notes: "",
    other_notes: "",
    design_style: "",
    selected_examples: [] as string[],
  });

  // Finishing Work form
  const [finishingForm, setFinishingForm] = useState({
    type: "external",
    name: "",
    phone_number: "",
    place_of_residence: "",
    project_location: "",
    site_area: "",
    vehicle_type: "",
  });

  // Solo Learn form
  const [soloForm, setSoloForm] = useState({
    type: "external",
    full_name: "",
    phone_number: "",
    date_of_birth: "",
    place_of_residence: "",
    college_major: "",
    status: "",
    year_of_graduation: "",
    project_location: "",
    worked_in_finishing_field: false,
    site_area: "",
    vehicle_type: "",
  });

  // ------------------ VALIDATION HELPERS ------------------ //
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

  const validateDesignStep = (step: string) => {
    let errors: any = {};
    if (step === "personal") {
      if (isEmpty(designForm.full_name))
        errors.full_name = "Full name is required.";
      if (isEmpty(designForm.phone_number))
        errors.phone_number = "Phone number is required.";
      if (isEmpty(designForm.city)) errors.city = "City is required.";
      if (isEmpty(designForm.project_location))
        errors.project_location = "Project location is required.";
    } else if (step === "projectinfo") {
      if (isEmpty(designForm.project_type))
        errors.project_type = "Select project type.";
      if (isEmpty(designForm.area)) errors.area = "Area is required.";
      if (isEmpty(designForm.preferred_colors))
        errors.preferred_colors = "Preferred colors are required.";
    } else if (step === "designinfo") {
      if (isEmpty(designForm.number_of_users))
        errors.number_of_users = "Number of users is required.";
      if (isEmpty(designForm.age_range))
        errors.age_range = "Age range is required.";
      if (isEmpty(designForm.special_notes))
        errors.special_notes = "Special notes are required.";
      if (isEmpty(designForm.other_notes))
        errors.other_notes = "Other notes are required.";
    }
    setDesignErrors(errors);
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
      errors.vehicle_type = "Select vehicle type.";
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

  // ------------------ SUBMIT HANDLERS ------------------ //
  const handleConstructionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConstruction()) return;
    try {
      const res: any = await dispatch(submitInquiry(constructionForm) as any);
      const payload = res?.payload;
      // Determine success or failure based on presence of errors
      const isError = !!payload?.errors;
      const isSuccess = !isError && !!payload?.data;
      // Build error message if errors exist
      let messageText = "";
      if (isError) {
        const errorMessages = Object.values(payload.errors).flat().join(" "); // combine all validation errors into a single string
        messageText =
          errorMessages || "Submission failed. Please check your inputs.";
      } else {
        messageText = payload?.message || "Submitted successfully!";
      }
      setMessage({
        type: isSuccess ? "success" : "danger",
        text: messageText,
      });

      if (isSuccess) {
        setConstructionForm({
          type: "external",
          name: "",
          phone_number: "",
          place_of_residence: "",
          project_location: "",
          project_area: "",
          type_of_space: "",
          sketch_available: false,
          image: null,
        });
      }
    } catch (err) {
      setMessage({ type: "danger", text: "Something went wrong." });
    }
  };

  const handleDesignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDesignStep("designinfo")) return;
    try {
      const payload: any = {
        ...designForm,
        design_style: selectedStyle || designForm.design_style,
        selected_examples: selectedImages.map((img) => img.split("/").pop()),
      };
      const res: any = await dispatch(submitDesignInquiry(payload) as any);
      const apiResponse = res?.payload || res;
      // Determine success or failure
      const isError = !!apiResponse?.errors;
      const isSuccess =
        (!isError && !!apiResponse?.data) || apiResponse?.status === true;
      // Build message text
      let messageText = "";
      if (isError) {
        const errorMessages = Object.values(apiResponse.errors)
          .flat()
          .join(" ");
        messageText =
          errorMessages || "Design inquiry failed. Please check your inputs.";
      } else {
        messageText =
          apiResponse?.message || "Design inquiry submitted successfully!";
      }

      // Set alert message
      setMessage({
        type: isSuccess ? "success" : "danger",
        text: messageText,
      });

      // Reset form only on success
      if (isSuccess) {
        setDesignForm({
          type: "external",
          full_name: "",
          phone_number: "",
          city: "",
          project_location: "",
          project_type: "",
          area: "",
          preferred_colors: "",
          architectural_plan: false,
          number_of_users: "",
          age_range: "",
          special_notes: "",
          other_notes: "",
          design_style: "",
          selected_examples: [],
        });
        setSelectedImages([]);
        setActiveDesignTab("personal");
      }
    } catch (err: any) {
      console.error("Design Inquiry Error:", err);
      setMessage({
        type: "danger",
        text: err?.message || "Something went wrong.",
      });
    }
  };

  const handleFinishingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFinishing()) return;
    try {
      const res: any = await dispatch(
        submitFinishingInquiry(finishingForm) as any
      );
      const payload = res?.payload;
      // Detect success or failure based on the presence of 'errors'
      const isError = !!payload?.errors;
      const isSuccess = !isError && !!payload?.data;
      // Prepare message text
      let messageText = "";
      if (isError) {
        const errorMessages = Object.values(payload.errors).flat().join(" ");
        messageText =
          errorMessages ||
          "Finishing inquiry failed. Please check your inputs.";
      } else {
        messageText = payload?.message || "Finishing inquiry submitted!";
      }

      setMessage({
        type: isSuccess ? "success" : "danger",
        text: messageText,
      });

      if (isSuccess) {
        setFinishingForm({
          type: "external",
          name: "",
          phone_number: "",
          place_of_residence: "",
          project_location: "",
          site_area: "",
          vehicle_type: "",
        });
      }
    } catch (err) {
      setMessage({ type: "danger", text: "Something went wrong." });
    }
  };
  // ------------------ DESIGN NAVIGATION ------------------ //
  const handleNextTab = (current: string, next: string) => {
    if (validateDesignStep(current)) {
      setActiveDesignTab(next);
      setDesignErrors({});
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ------------------ SUBMIT HANDLERS ------------------ //
  const handleSoloSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSolo()) return;

    try {
      const res: any = await dispatch(submitSoloLearnInquiry(soloForm) as any);
      const payload = res?.payload || res;

      const isError = !!payload?.errors;
      const isSuccess = !isError && !!payload?.data;

      let messageText = "";

      if (isError) {
        const errorMessages = Object.values(payload.errors).flat().join(" ");
        messageText =
          errorMessages ||
          "Sololearn inquiry failed. Please check your inputs.";
      } else {
        messageText = payload?.message || "Sololearn inquiry submitted!";
      }

      setMessage({
        type: isSuccess ? "success" : "danger",
        text: messageText,
      });

      if (isSuccess) {
        setSoloForm({
          type: "external",
          full_name: "",
          phone_number: "",
          date_of_birth: "",
          place_of_residence: "",
          college_major: "",
          status: "",
          year_of_graduation: "",
          worked_in_finishing_field: false,
        });
      }
    } catch (err: any) {
      console.error("SoloLearn Inquiry Error:", err);
      setMessage({
        type: "danger",
        text: err?.message || "Something went wrong.",
      });
    }
  };

  // ------------------ MODAL HANDLERS ------------------ //
  const handleOpenModal = (style: string) => {
    setSelectedStyle(style);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleImageSelect = (imageId: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };
  const handleConfirmSelection = () => handleCloseModal();
  const { t } = useTranslation();

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
            {" "}
            {message.text}{" "}
          </Alert>
        )}
        <Tabs defaultActiveKey="design" id="tabbing-form" className="mb-3">
          {/* ---------------- CONSTRUCTION TAB ---------------- */}
          <Tab eventKey="construction" title={t("ConstructionWorkForm.title")}>
            <div className="personal-info-box custruction-info-box">
              <Form onSubmit={handleConstructionSubmit}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="constructionFullName"
                    >
                      <Form.Label>
                        {" "}
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
                          {" "}
                          {constructionErrors.name}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="constructionPhone">
                      <Form.Label>
                        {" "}
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
                        {" "}
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
                          {" "}
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
                        {" "}
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
                          {" "}
                          {constructionErrors.project_location}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="constructionProjectArea"
                    >
                      <Form.Label>
                        {" "}
                        {t("ConstructionWorkForm.project_area")}{" "}
                      </Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            name="project_area"
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
                            type="number"
                            name="project_area"
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
                            type="number"
                            name="project_area"
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
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group
                      className="mb-3 radio-btn"
                      controlId="constructionSpaceType"
                    >
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
          <Tab eventKey="design" title={t("DesignWorkForm.title")}>
            <div className="fomr-design-box">
              {/* ✅ Entire Design Form wrapped in <Form onSubmit={handleDesignSubmit}> */}
              <Form onSubmit={handleDesignSubmit}>
                <Tabs
                  activeKey={activeDesignTab}
                  onSelect={(k) => setActiveDesignTab(k || "personal")}
                  id="tabbing-form-design"
                  className="mb-3"
                >
                  {/* PERSONAL INFO */}
                  <Tab
                    eventKey="personal"
                    title={t("DesignWorkForm.personal_info_tab_title")}
                  >
                    <div className="personal-info-box">
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designFullName"
                          >
                            <Form.Label>
                              {" "}
                              {t("DesignWorkForm.fullname")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="full_name"
                              placeholder={t("DesignWorkForm.enter_name")}
                              value={designForm.full_name}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  full_name: e.target.value,
                                })
                              }
                            />
                            {designErrors.full_name && (
                              <small className="text-danger">
                                {" "}
                                {designErrors.full_name}
                              </small>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3" controlId="designPhone">
                            <Form.Label>
                              {" "}
                              {t("DesignWorkForm.phone_number")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="phone_number"
                              placeholder={t(
                                "DesignWorkForm.enter_phone_number"
                              )}
                              value={designForm.phone_number}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  phone_number: e.target.value,
                                })
                              }
                            />
                            {designErrors.phone_number && (
                              <small className="text-danger">
                                {" "}
                                {designErrors.phone_number}
                              </small>
                            )}
                          </Form.Group>
                        </Col>

                        {/*<Col md={12} lg={6}>
                          <Form.Group className="mb-3" controlId="designCity">
                            <Form.Label>{t("DesignWorkForm.city")}</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              placeholder={t("DesignWorkForm.enter_city")}
                              value={designForm.city}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  city: e.target.value,
                                })
                              }
                            />
                            {designErrors.city && (
                              <small className="text-danger">
                                {designErrors.city}
                              </small>
                            )}
                          </Form.Group>
                        </Col>*/}

                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designPlaceOfResidence"
                          >
                            <Form.Label>
                              {t("DesignWorkForm.project_location")} - Place of
                              Residence
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="project_location"
                              placeholder={t(
                                "DesignWorkForm.enter_project_location"
                              )}
                              value={designForm.project_location}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  project_location: e.target.value,
                                })
                              }
                            />
                            {designErrors.project_location && (
                              <small className="text-danger">
                                {designErrors.project_location}
                              </small>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={12} className="text-end">
                          <Button
                            className="btn btn-teal"
                            onClick={() =>
                              handleNextTab("personal", "projectinfo")
                            }
                            type="button"
                          >
                            {" "}
                            {t("DesignWorkForm.next")}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Tab>

                  {/* PROJECT INFO */}
                  <Tab eventKey="projectinfo" title="Project Info">
                    <div className="personal-info-box building-info-box">
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designProjectLocation"
                          >
                            <Form.Label> Project Location</Form.Label>
                            <Form.Control
                              type="text"
                              name="project_location"
                              placeholder="Project Location"
                              value={designForm.project_location}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  project_location: e.target.value,
                                })
                              }
                            />
                            {designErrors.project_location && (
                              <small className="text-danger">
                                {" "}
                                {designErrors.project_location}{" "}
                              </small>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designProjectArea"
                          >
                            <Form.Label> Project Area (m²)</Form.Label>
                            <Form.Control
                              type="text"
                              name="projectarea"
                              placeholder={t("ProjectInfoForm.enter_area")}
                              value={designForm.projectarea}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  projectarea: e.target.value,
                                })
                              }
                            />
                            {designErrors.area && (
                              <small className="text-danger">
                                {" "}
                                {designErrors.projectarea}
                              </small>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3 radio-btn"
                            controlId="designsketchdrawing"
                          >
                            <Form.Label className="p-type">
                              {" "}
                              Sketch Drawing
                            </Form.Label>
                            <Form.Check
                              inline
                              type="radio"
                              id="designYes"
                              label="Available"
                              name="sketch_drawing"
                              value="Yes"
                              checked={designForm.sketch_drawing === true}
                              onChange={() =>
                                setDesignForm({
                                  ...designForm,
                                  sketch_drawing: true,
                                })
                              }
                            />
                            <Form.Check
                              inline
                              type="radio"
                              id="designNo"
                              label="Not Available"
                              name="sketch_drawing"
                              value="No"
                              checked={designForm.sketch_drawing === false}
                              onChange={() =>
                                setDesignForm({
                                  ...designForm,
                                  sketch_drawing: false,
                                })
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col
                          md={12}
                          className="text-end justify-content-between d-flex"
                        >
                          <Button
                            variant="secondary"
                            className="me-2 btn-black"
                            onClick={() => setActiveDesignTab("personal")}
                            type="button"
                          >
                            {" "}
                            {t("ProjectInfoForm.back")}{" "}
                          </Button>
                          <Button
                            className="btn btn-teal"
                            onClick={() =>
                              handleNextTab("projectinfo", "designinfo")
                            }
                            type="button"
                          >
                            {" "}
                            {t("ProjectInfoForm.next")}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Tab>

                  {/* DESIGN INFO */}
                  <Tab eventKey="designinfo" title="Design Info">
                    <div className="personal-info-box design-info-box">
                      <Row>
                        {/* Desired Built-Up Area */}
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="designDesiredBuiltUpArea"
                          >
                            <Form.Label>Desired Built-Up Area</Form.Label>
                            <Row>
                              <Col md={6} lg={3}>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="desiredbuiltuparea_from"
                                  value={designForm.desiredbuiltuparea_from}
                                  onChange={(e) =>
                                    setDesignForm({
                                      ...designForm,
                                      desiredbuiltuparea_from: e.target.value,
                                    })
                                  }
                                />
                                {designErrors.desiredbuiltuparea_from && (
                                  <small className="text-danger">
                                    {designErrors.desiredbuiltuparea_from}
                                  </small>
                                )}
                              </Col>

                              <Col md={6} lg={3}>
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="desiredbuiltuparea_to"
                                  value={designForm.desiredbuiltuparea_to}
                                  onChange={(e) =>
                                    setDesignForm({
                                      ...designForm,
                                      desiredbuiltuparea_to: e.target.value,
                                    })
                                  }
                                />
                                {designErrors.desiredbuiltuparea_to && (
                                  <small className="text-danger">
                                    {designErrors.desiredbuiltuparea_to}
                                  </small>
                                )}
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        {/* Number of Floors */}
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="designNumberOfFloors"
                          >
                            <Form.Label>Number of Floors</Form.Label>
                            {[
                              "Ground Floor",
                              "Two Floors",
                              "Three Floors",
                              "Four Floors or More",
                            ].map((label) => (
                              <Form.Check
                                key={label}
                                inline
                                type="radio"
                                label={label}
                                name="number_of_floors"
                                value={label}
                                checked={designForm.number_of_floors === label}
                                onChange={(e) =>
                                  setDesignForm({
                                    ...designForm,
                                    number_of_floors: e.target.value,
                                  })
                                }
                              />
                            ))}
                          </Form.Group>
                        </Col>

                        {/* Design Preferences */}
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="designPreferences"
                          >
                            <Form.Label>Design Preferences</Form.Label>
                            <p>
                              Please select the spaces based on your personal
                              needs and lifestyle requirements
                            </p>

                            {[
                              "Separate Floor for reception and living areas, and another floor for bedrooms",
                              "All spaces combined on a single floor",
                              "Guest Bedroom with Bathroom",
                              "Guest Bedroom without Bathroom",
                              "External Reception with Restroom",
                              "Reception + Dining Room + Restroom",
                              "Men’s Reception with Separate Restroom",
                              "Women’s Reception with Separate Restroom",
                              "Living Room",
                              "Closed Kitchen",
                              "Open Kitchen",
                              "Separate Hot/Cold Kitchen",
                              "Dining Area",
                              "Master Bedroom with Bathroom",
                              "Master Bedroom with Dressing Room & Bathroom",
                              "Children’s Bedrooms (number)",
                              "One",
                              "Two",
                              "Three",
                              "Four or More",
                              "Maid’s Room",
                              "Driver’s Room",
                              "Laundry Room",
                              "Storage Room",
                              "Cinema Room",
                              "Recreation/Gym Room",
                              "Indoor Courtyard",
                              "Swimming Pool",
                            ].map((option) => (
                              <Form.Check
                                key={option}
                                inline
                                type="radio"
                                label={option}
                                name="design_preferences"
                                value={option}
                                checked={
                                  designForm.design_preferences === option
                                }
                                onChange={(e) =>
                                  setDesignForm({
                                    ...designForm,
                                    design_preferences: e.target.value,
                                  })
                                }
                              />
                            ))}
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          className="btn-black"
                          variant="secondary"
                          onClick={() => setActiveDesignTab("projectinfo")}
                          type="button"
                        >
                          {" "}
                          {t("DesingInfoForm.previous")}
                        </Button>
                        <Button
                          className="btn btn-teal"
                          onClick={() => setActiveDesignTab("designtype")}
                          type="button"
                        >
                          {" "}
                          {t("DesingInfoForm.next")}
                        </Button>
                      </div>
                    </div>
                  </Tab>

                  {/* DESIGN TYPE */}
                  <Tab eventKey="designtype" title={t("DesignTypeForm.title")}>
                    <div className="design-type-box">
                      <h3>{t("DesignTypeForm.design_style")}</h3>
                      <p>{t("DesignTypeForm.select_design_style")}</p>
                      <div className="design-type-categories">
                        <Row>
                          {Object.keys(designExamples).map((style, i) => (
                            <Col md={6} lg={4} className="h-400" key={i}>
                              <div className="design-type-item">
                                <img
                                  src={designExamples[style][0]}
                                  alt={`${style} Design`}
                                  onError={(e) =>
                                    (e.currentTarget.src = ExteriourDesign)
                                  }
                                />
                                <div className="designtype-text">
                                  <h4>
                                    {" "}
                                    {style} {t("DesignTypeForm.design")}
                                  </h4>
                                  <Button
                                    className="btn-gray"
                                    type="button"
                                    onClick={() => handleOpenModal(style)}
                                  >
                                    {" "}
                                    {t("DesignTypeForm.see_examples")}
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          className="btn-black"
                          variant="secondary"
                          type="button"
                          onClick={() => setActiveDesignTab("designinfo")}
                        >
                          {" "}
                          {t("DesignTypeForm.previous")}
                        </Button>
                        {/* ✅ This button now submits the full form */}
                        <Button
                          className="btn btn-teal"
                          type="submit"
                          disabled={inquiryState.loading}
                        >
                          {" "}
                          {inquiryState.loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            t("DesignTypeForm.submit")
                          )}{" "}
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Form>
            </div>
          </Tab>

          {/* ---------------- FINISHING TAB ---------------- */}
          <Tab eventKey="finishing" title={t("FinishingWorkForm.title")}>
            <div className="personal-info-box custruction-info-box">
              <Form onSubmit={handleFinishingSubmit}>
                <Row>
                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="finishingFullName">
                      <Form.Label>
                        {" "}
                        {t("FinishingWorkForm.full_name")}{" "}
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
                          {" "}
                          {finishingErrors.name}{" "}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group className="mb-3" controlId="finishingPhone">
                      <Form.Label>
                        {" "}
                        {t("FinishingWorkForm.phone_number")}{" "}
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
                        {" "}
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
                        {" "}
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
                          {finishingErrors.project_location}{" "}
                        </small>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="finishingProjectArea"
                    >
                      <Form.Label>
                        {" "}
                        {t("FinishingWorkForm.project_area")}
                      </Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            name="site_area"
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
                            type="number"
                            name="site_area"
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
                            type="number"
                            name="site_area"
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
                        {finishingErrors.site_area && (
                          <small className="text-danger">
                            {" "}
                            {finishingErrors.site_area}
                          </small>
                        )}
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col md={12} lg={6}>
                    <Form.Group
                      className="mb-3 radio-btn"
                      controlId="finishingVacuumType"
                    >
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
                          {finishingErrors.vehicle_type}{" "}
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
                      )}{" "}
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
                        {" "}
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
                        {" "}
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
                    <Form.Group
                      className="mb-3 radio-btn"
                      controlId="soloStatus"
                    >
                      <Form.Label className="p-type">
                        {t("SoloLearnForm.status")}{" "}
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
                    <Form.Group
                      className="mb-3 radio-btn"
                      controlId="soloWorkedField"
                    >
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
      </Container>

      {/* -------------- STYLE SELECTION MODAL -------------- */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        className="de-chose-image"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Examples for {selectedStyle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {selectedStyle &&
              designExamples[selectedStyle].map((example) => {
                const fileName = example.split("/").pop() || "";
                const isSelected = selectedImages.includes(example);
                return (
                  <div className="new-image-interior" key={example}>
                    <div
                      className={`example-card border rounded position-relative ${
                        isSelected ? "border-teal shadow-sm" : "border-light"
                      }`}
                      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                      onClick={() => handleImageSelect(example)}
                    >
                      {/* Image */}
                      <img
                        src={example}
                        alt={fileName}
                        className="img-fluid rounded"
                        onError={(e) => (e.currentTarget.src = ExteriourDesign)}
                      />
                      {/* Radio/checkbox-like indicator */}
                      <div
                        className={`select-indicator position-absolute top-0 end-0 m-2 rounded-circle border ${
                          isSelected
                            ? "bg-teal border-teal"
                            : "bg-white border-secondary"
                        }`}
                        style={{
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          color: "#fff",
                          backgroundColor: "#2ea19b",
                        }}
                      >
                        {" "}
                        {isSelected && "✓"}
                      </div>
                      {/* Image name */}
                      <p className="mt-2 mb-0 small fw-medium d-none">
                        {" "}
                        {fileName}
                      </p>
                    </div>
                  </div>
                );
              })}
          </Row>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <div className="text-muted">
            {" "}
            Selected: {selectedImages.length} image{" "}
            {selectedImages.length !== 1 && "s"}
          </div>
          <div>
            <Button variant="secondary" onClick={handleCloseModal}>
              {" "}
              Cancel
            </Button>
            <Button
              className="btn btn-teal ms-2"
              onClick={handleConfirmSelection}
            >
              {" "}
              Confirm Selection
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ExteriorForm;
