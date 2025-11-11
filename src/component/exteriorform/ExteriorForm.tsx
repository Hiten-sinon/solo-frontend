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
    NewClassic: [
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
    Minimalist: [
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
    Mediterranean: [
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
  const [loading, setLoading] = useState(false);

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

  // Design Work form - FULL field set matching API
  const [designForm, setDesignForm] = useState<any>({
    type: "external",
    full_name: "",
    phone_number: "",
    place_of_residence: "",
    project_location: "",
    project_area: "",
    sketch_drawing: false,
    desired_area_from: "",
    desired_area_to: "",
    number_of_floors: "",
    separate_floor_reception_living: false,
    combined_floor: false,
    guest_bedroom_with_bathroom: false,
    guest_bedroom_without_bathroom: false,
    external_reception_restroom: false,
    reception_dining_restroom: false,
    men_reception_separate_restroom: false,
    women_reception_separate_restroom: false,
    living_room: false,
    closed_kitchen: false,
    open_kitchen: false,
    separate_hot_cold_kitchen: false,
    dining_area: false,
    master_bedroom_with_bathroom: false,
    master_bedroom_with_dressing_bathroom: false,
    children_bedrooms: "",
    maids_room: false,
    drivers_room: false,
    laundry_room: false,
    storage_room: false,
    cinema_room: false,
    recreation_gym_room: false,
    indoor_courtyard: false,
    swimming_pool: false,
    design_style: "",
    notes: "",
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
    const errors: any = {};
    if (step === "personal") {
      if (isEmpty(designForm.full_name))
        errors.full_name = "Full name is required.";
      if (isEmpty(designForm.phone_number))
        errors.phone_number = "Phone number is required.";
      if (isEmpty(designForm.place_of_residence))
        errors.place_of_residence = "Place of residence is required.";
      //if (isEmpty(designForm.project_area))
      //errors.project_area = "Project area is required.";
    } else if (step === "projectinfo") {
      if (isEmpty(designForm.project_area))
        errors.project_area = "Project area is required.";
      if (isEmpty(designForm.project_location))
        errors.project_location = "Project location is required.";
    } else if (step === "designinfo") {
      if (isEmpty(designForm.number_of_floors))
        errors.number_of_floors = "Please choose number of floors.";
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
      const isError = !!payload?.errors;
      const isSuccess = !isError && !!payload?.data;
      let messageText = "";
      if (isError) {
        const errorMessages = Object.values(payload.errors).flat().join(" ");
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

    // final validation across steps
    const okPersonal = validateDesignStep("personal");
    const okProject = validateDesignStep("projectinfo");
    const okDesign = validateDesignStep("designinfo");
    if (!okPersonal || !okProject || !okDesign) {
      setMessage({
        type: "danger",
        text: "Please fix errors in the form before submitting.",
      });
      return;
    }

    // Build payload exactly matching the API sample in the prompt
    const payload: any = {
      type: designForm.type || "external",
      full_name: designForm.full_name,
      phone_number: designForm.phone_number,
      place_of_residence: designForm.place_of_residence,
      project_location: designForm.project_location,
      project_area: String(designForm.project_area || ""),
      sketch_drawing: Boolean(designForm.sketch_drawing),
      desired_area_from: designForm.desired_area_from,
      desired_area_to: designForm.desired_area_to,
      number_of_floors: designForm.number_of_floors,
      separate_floor_reception_living: Boolean(
        designForm.separate_floor_reception_living
      ),
      combined_floor: Boolean(designForm.combined_floor),
      guest_bedroom_with_bathroom: Boolean(
        designForm.guest_bedroom_with_bathroom
      ),
      guest_bedroom_without_bathroom: Boolean(
        designForm.guest_bedroom_without_bathroom
      ),
      external_reception_restroom: Boolean(
        designForm.external_reception_restroom
      ),
      reception_dining_restroom: Boolean(designForm.reception_dining_restroom),
      men_reception_separate_restroom: Boolean(
        designForm.men_reception_separate_restroom
      ),
      women_reception_separate_restroom: Boolean(
        designForm.women_reception_separate_restroom
      ),
      living_room: Boolean(designForm.living_room),
      closed_kitchen: Boolean(designForm.closed_kitchen),
      open_kitchen: Boolean(designForm.open_kitchen),
      separate_hot_cold_kitchen: Boolean(designForm.separate_hot_cold_kitchen),
      dining_area: Boolean(designForm.dining_area),
      master_bedroom_with_bathroom: Boolean(
        designForm.master_bedroom_with_bathroom
      ),
      master_bedroom_with_dressing_bathroom: Boolean(
        designForm.master_bedroom_with_dressing_bathroom
      ),
      children_bedrooms: designForm.children_bedrooms || "",
      maids_room: Boolean(designForm.maids_room),
      drivers_room: Boolean(designForm.drivers_room),
      laundry_room: Boolean(designForm.laundry_room),
      storage_room: Boolean(designForm.storage_room),
      cinema_room: Boolean(designForm.cinema_room),
      recreation_gym_room: Boolean(designForm.recreation_gym_room),
      indoor_courtyard: Boolean(designForm.indoor_courtyard),
      swimming_pool: Boolean(designForm.swimming_pool),
      design_style: designForm.design_style,
      notes: designForm.notes,
      selected_examples: selectedImages
        .map((img) => img.split("/").pop())
        .filter((x): x is string => Boolean(x)),
    };

    try {
      setLoading(true);
      const res: any = await dispatch(submitDesignInquiry(payload) as any);
      // support both unwrap and non-unwrap dispatch
      const response = res?.payload || res;
      if (response?.status) {
        setMessage({
          type: "success",
          text: response?.message || "Design Inquiry submitted successfully.",
        });
        // clear form
        setDesignForm({
          type: "external",
          full_name: "",
          phone_number: "",
          place_of_residence: "",
          project_location: "",
          project_area: "",
          sketch_drawing: false,
          desired_area_from: "",
          desired_area_to: "",
          number_of_floors: "",
          separate_floor_reception_living: false,
          combined_floor: false,
          guest_bedroom_with_bathroom: false,
          guest_bedroom_without_bathroom: false,
          external_reception_restroom: false,
          reception_dining_restroom: false,
          men_reception_separate_restroom: false,
          women_reception_separate_restroom: false,
          living_room: false,
          closed_kitchen: false,
          open_kitchen: false,
          separate_hot_cold_kitchen: false,
          dining_area: false,
          master_bedroom_with_bathroom: false,
          master_bedroom_with_dressing_bathroom: false,
          children_bedrooms: "",
          maids_room: false,
          drivers_room: false,
          laundry_room: false,
          storage_room: false,
          cinema_room: false,
          recreation_gym_room: false,
          indoor_courtyard: false,
          swimming_pool: false,
          design_style: "",
          notes: "",
          selected_examples: [] as string[],
        });
        setSelectedImages([]);
        setActiveDesignTab("personal");
      } else {
        setMessage({
          type: "danger",
          text: response?.message || "Something went wrong",
        });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({
        type: "danger",
        text:
          err?.response?.data?.message || err?.message || "Failed to submit",
      });
    } finally {
      setLoading(false);
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
      const isError = !!payload?.errors;
      const isSuccess = !isError && !!payload?.data;
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

  // ------------------ DESIGN NAVIGATION ------------------ //
  const goToNextDesignTab = (current: string, next: string) => {
    console.log(":: goToNextDesignTab ::", {
      current,
      next,
      isValidated: validateDesignStep(current),
    });
    if (validateDesignStep(current)) {
      setActiveDesignTab(next);
      setDesignErrors({});
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

          <Tab eventKey="design" title={t("DesignWorkForm.title")}>
            <div className="fomr-design-box">
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

                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designPlaceOfResidence"
                          >
                            <Form.Label>
                              {" "}
                              {t("DesignWorkForm.place_of_residence")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="place_of_residence"
                              placeholder={t(
                                "DesignWorkForm.enter_place_of_residence"
                              )}
                              value={designForm.place_of_residence}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  place_of_residence: e.target.value,
                                })
                              }
                            />
                            {designErrors.place_of_residence && (
                              <small className="text-danger">
                                {designErrors.place_of_residence}
                              </small>
                            )}
                          </Form.Group>
                        </Col>

                        <Col md={12} className="text-end">
                          <Button
                            className="btn btn-teal"
                            onClick={() =>
                              goToNextDesignTab("personal", "projectinfo")
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
                  <Tab
                    eventKey="projectinfo"
                    title={t("ProjectInfoForm.title")}
                  >
                    <div className="personal-info-box building-info-box">
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="designProjectLocation"
                          >
                            <Form.Label>
                              {" "}
                              {t("ProjectInfoForm.project_location")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="project_location"
                              placeholder={t(
                                "ProjectInfoForm.enter_project_location"
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
                            <Form.Label>
                              {" "}
                              {t("ProjectInfoForm.project_area")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="project_area"
                              placeholder={t("ProjectInfoForm.enter_area")}
                              value={designForm.project_area}
                              onChange={(e) =>
                                setDesignForm({
                                  ...designForm,
                                  project_area: e.target.value,
                                })
                              }
                            />
                            {designErrors.project_area && (
                              <small className="text-danger">
                                {designErrors.project_area}
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
                              {t("ProjectInfoForm.sketch_drawing")}
                            </Form.Label>
                            <Form.Check
                              inline
                              type="radio"
                              id="designYes"
                              label={t("ProjectInfoForm.available")}
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
                              label={t("ProjectInfoForm.not_available")}
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
                              goToNextDesignTab("projectinfo", "designinfo")
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
                  <Tab eventKey="designinfo" title={t("DesingInfoForm.title")}>
                    <div className="personal-info-box design-info-box">
                      <Row>
                        {/* Desired Built-Up Area */}
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="designDesiredBuiltUpArea"
                          >
                            <Form.Label>
                              {t("DesingInfoForm.desired_built_up_area")}
                            </Form.Label>
                            <Row>
                              <Col md={6} lg={3}>
                                <Form.Label>
                                  {t("DesingInfoForm.from")}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="desired_area_from"
                                  value={designForm.desired_area_from}
                                  onChange={(e) =>
                                    setDesignForm({
                                      ...designForm,
                                      desired_area_from: e.target.value,
                                    })
                                  }
                                />
                                {designErrors.desired_area_from && (
                                  <small className="text-danger">
                                    {designErrors.desired_area_from}
                                  </small>
                                )}
                              </Col>

                              <Col md={6} lg={3}>
                                <Form.Label>
                                  {t("DesingInfoForm.to")}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="desired_area_to"
                                  value={designForm.desired_area_to}
                                  onChange={(e) =>
                                    setDesignForm({
                                      ...designForm,
                                      desired_area_to: e.target.value,
                                    })
                                  }
                                />
                                {designErrors.desired_area_to && (
                                  <small className="text-danger">
                                    {designErrors.desired_area_to}
                                  </small>
                                )}
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>

                        {/* Number of Floors */}
                        <Col md={12}>
                          <div className="mb-3 radio-btn">
                            <Form.Group
                              className="mb-3"
                              controlId="designNumberOfFloors"
                            >
                              <Form.Label>
                                {t("DesingInfoForm.number_of_floors")}
                              </Form.Label>
                              {[
                                { key: "ground_floor", value: "Ground Floor" },
                                { key: "two_floors", value: "Two Floors" },
                                { key: "three_floors", value: "Three Floors" },
                                {
                                  key: "four_floors_or_more",
                                  value: "Four Floors or More",
                                },
                              ].map((item) => (
                                <Form.Check
                                  key={item.key}
                                  inline
                                  type="radio"
                                  label={t(`DesingInfoForm.${item.key}`)} // ✅ Use translation key
                                  name="number_of_floors"
                                  id={`designNumberOfFloors_${item.key}`}
                                  value={item.value}
                                  checked={
                                    designForm.number_of_floors === item.value
                                  }
                                  onChange={(e) =>
                                    setDesignForm({
                                      ...designForm,
                                      number_of_floors: e.target.value,
                                    })
                                  }
                                />
                              ))}
                              {designErrors.number_of_floors && (
                                <small className="text-danger">
                                  {designErrors.number_of_floors}
                                </small>
                              )}
                            </Form.Group>
                          </div>
                        </Col>

                        {/* Design Preferences - keep UI similar to original but as checkboxes */}
                        <Col md={12}>
                          <div className="mb-3 radio-btn">
                            <Form.Group
                              className="mb-3"
                              controlId="designPreferences"
                            >
                              <Form.Label>
                                {t("DesingInfoForm.design_preferences")}
                              </Form.Label>
                              <p>{t("DesingInfoForm.note1")}</p>

                              <Row>
                                <Col md={12} lg={6}>
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.separate_floor_for_reception_and_living_areas_and_another_floor_for_bedrooms"
                                    )}
                                    checked={
                                      designForm.separate_floor_reception_living
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        separate_floor_reception_living:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.all_spaces_combined_on_a_single_floor"
                                    )}
                                    checked={designForm.combined_floor}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        combined_floor: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.guest_bedroom_with_bathroom"
                                    )}
                                    checked={
                                      designForm.guest_bedroom_with_bathroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        guest_bedroom_with_bathroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.guest_bedroom_without_bathroom"
                                    )}
                                    checked={
                                      designForm.guest_bedroom_without_bathroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        guest_bedroom_without_bathroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.external_reception_with_restroom"
                                    )}
                                    checked={
                                      designForm.external_reception_restroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        external_reception_restroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.reception_dining_room_restroom"
                                    )}
                                    checked={
                                      designForm.reception_dining_restroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        reception_dining_restroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                </Col>
                                <Col md={12} lg={6}>
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.men_reception_with_separate_restroom"
                                    )}
                                    checked={
                                      designForm.men_reception_separate_restroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        men_reception_separate_restroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.women_reception_with_separate_restroom"
                                    )}
                                    checked={
                                      designForm.women_reception_separate_restroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        women_reception_separate_restroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.living_room")}
                                    checked={designForm.living_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        living_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.closed_kitchen")}
                                    checked={designForm.closed_kitchen}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        closed_kitchen: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.open_kitchen")}
                                    checked={designForm.open_kitchen}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        open_kitchen: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.separate_hotcold_kitchen"
                                    )}
                                    checked={
                                      designForm.separate_hot_cold_kitchen
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        separate_hot_cold_kitchen:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                </Col>
                                <Col md={12} className="mt-2">
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.dining_area")}
                                    checked={designForm.dining_area}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        dining_area: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.master_bedroom_with_bathroom"
                                    )}
                                    checked={
                                      designForm.master_bedroom_with_bathroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        master_bedroom_with_bathroom:
                                          e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.master_bedroom_with_dressing_room_and_bathroom"
                                    )}
                                    checked={
                                      designForm.master_bedroom_with_dressing_bathroom
                                    }
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        master_bedroom_with_dressing_bathroom:
                                          e.target.checked,
                                      })
                                    }
                                  />

                                  <Form.Group className="mt-2 mb-4" controlId="childrenBedrooms">
                                    <Form.Label>
                                      {t("DesingInfoForm.children_bedrooms")}
                                    </Form.Label>

                                    <Form.Check
                                      type="radio"
                                      name="children_bedrooms"
                                      label={t("DesingInfoForm.one")}
                                      value="one"
                                      checked={designForm.children_bedrooms === "one"}
                                      onChange={(e) =>
                                        setDesignForm({
                                          ...designForm,
                                          children_bedrooms: e.target.value,
                                        })
                                      }
                                    />

                                    <Form.Check
                                      type="radio"
                                      name="children_bedrooms"
                                      label={t("DesingInfoForm.two")}
                                      value="two"
                                      checked={designForm.children_bedrooms === "two"}
                                      onChange={(e) =>
                                        setDesignForm({
                                          ...designForm,
                                          children_bedrooms: e.target.value,
                                        })
                                      }
                                    />

                                    <Form.Check
                                      type="radio"
                                      name="children_bedrooms"
                                      label={t("DesingInfoForm.three")}
                                      value="three"
                                      checked={designForm.children_bedrooms === "three"}
                                      onChange={(e) =>
                                        setDesignForm({
                                          ...designForm,
                                          children_bedrooms: e.target.value,
                                        })
                                      }
                                    />

                                    <Form.Check
                                      type="radio"
                                      name="children_bedrooms"
                                      label={t("DesingInfoForm.four")}
                                      value="four"
                                      checked={designForm.children_bedrooms === "four"}
                                      onChange={(e) =>
                                        setDesignForm({
                                          ...designForm,
                                          children_bedrooms: e.target.value,
                                        })
                                      }
                                    />
                                  </Form.Group>

                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.maid_room")}
                                    checked={designForm.maids_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        maids_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.driver_room")}
                                    checked={designForm.drivers_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        drivers_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.laundry_room")}
                                    checked={designForm.laundry_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        laundry_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.storage_room")}
                                    checked={designForm.storage_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        storage_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.cinema_room")}
                                    checked={designForm.cinema_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        cinema_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t(
                                      "DesingInfoForm.recreation_gym_room"
                                    )}
                                    checked={designForm.recreation_gym_room}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        recreation_gym_room: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.indoor_courtyard")}
                                    checked={designForm.indoor_courtyard}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        indoor_courtyard: e.target.checked,
                                      })
                                    }
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    label={t("DesingInfoForm.swimming_pool")}
                                    checked={designForm.swimming_pool}
                                    onChange={(e) =>
                                      setDesignForm({
                                        ...designForm,
                                        swimming_pool: e.target.checked,
                                      })
                                    }
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </div>
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
                          onClick={() =>
                            goToNextDesignTab("designinfo", "designtype")
                          }
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
                      <p>{t("DesignTypeForm.note2")}</p>
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
                      <p>{t("DesignTypeForm.note1")}</p>
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
                          disabled={inquiryState.loading || loading}
                        >
                          {" "}
                          {inquiryState.loading || loading ? (
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
                      className={`example-card border rounded position-relative ${isSelected ? "border-teal shadow-sm" : "border-light"
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
                        className={`select-indicator position-absolute top-0 end-0 m-2 rounded-circle border ${isSelected
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
