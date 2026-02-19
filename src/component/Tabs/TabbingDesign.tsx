import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Modal, Form, Spinner, Alert, } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { submitDesignInquiry, } from "../../redux/slice/inquirySlice";
import { InquryDesign } from "../../assets/images";
import ExteriorForm from "../exteriorform/ExteriorForm";

type DesignExamples = {
    [key: string]: string[];
};

const TabbingDesign = () => {
    const dispatch = useDispatch<AppDispatch>();
    const inquiryState = useSelector((state: RootState) => state.inquiry);
    const designExamples: DesignExamples = {
        Andalusian: [
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
        Japandi: [
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

    const [designErrors, setDesignErrors] = useState<{ [key: string]: string }>(
        {}
    );


    // Design Work form
    const [designForm, setDesignForm] = useState({
        type: "internal",
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

    // ------------------ VALIDATION HELPERS ------------------ //
    const isEmpty = (val: any) => !val || val.toString().trim() === "";



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






    const handleDesignSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateDesignStep("designinfo")) return;

        try {
            const payload = {
                ...designForm,
                design_style: selectedStyle || designForm.design_style,
                //selected_examples: selectedImages.map((img) => img.split("/").pop()),
                selected_examples: selectedImages
                    .map((img) => img.split("/").pop())
                    .filter((x): x is string => Boolean(x)),
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
                    type: "internal",
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


    // ------------------ DESIGN NAVIGATION ------------------ //
    const handleNextTab = (current: string, next: string) => {
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
        <>
            <Tabs
                defaultActiveKey="interior"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="interior" title="Interior Design">
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
                                                            {designErrors.full_name}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group className="mb-3" controlId="designPhone">
                                                    <Form.Label>
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
                                                            {designErrors.phone_number}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
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
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designProjectLocation"
                                                >
                                                    <Form.Label>
                                                        {t("DesignWorkForm.project_location")}
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
                                <Tab
                                    eventKey="projectinfo"
                                    title={t("ProjectInfoForm.title")}
                                >
                                    <div className="personal-info-box building-info-box">
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Form.Group className="mb-3 radio-btn">
                                                    <Form.Label className="p-type">
                                                        {t("ProjectInfoForm.project_type")}
                                                    </Form.Label>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="designResidential"
                                                        label={t("ProjectInfoForm.residential")}
                                                        name="project_type"
                                                        value="residential"
                                                        checked={
                                                            designForm.project_type === "residential"
                                                        }
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                project_type: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="designCommercial"
                                                        label={t("ProjectInfoForm.commmercial")}
                                                        name="project_type"
                                                        value="commercial"
                                                        checked={designForm.project_type === "commercial"}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                project_type: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.project_type && (
                                                        <small className="text-danger">
                                                            {designErrors.project_type}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group className="mb-3" controlId="designArea">
                                                    <Form.Label>{t("ProjectInfoForm.area")}</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="area"
                                                        placeholder={t("ProjectInfoForm.enter_area")}
                                                        value={designForm.area}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                area: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.area && (
                                                        <small className="text-danger">
                                                            {designErrors.area}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designPreferredColors"
                                                >
                                                    <Form.Label>
                                                        {t("ProjectInfoForm.preferred_colors")}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="preferred_colors"
                                                        placeholder={t(
                                                            "ProjectInfoForm.preferred_colors"
                                                        )}
                                                        value={designForm.preferred_colors}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                preferred_colors: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.preferred_colors && (
                                                        <small className="text-danger">
                                                            {designErrors.preferred_colors}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group className="mb-3 radio-btn">
                                                    <Form.Label className="p-type">
                                                        {t(
                                                            "ProjectInfoForm.is_an_architectural_plan_available"
                                                        )}
                                                    </Form.Label>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="designYes"
                                                        label={t("ProjectInfoForm.yes")}
                                                        name="architectural_plan"
                                                        value="Yes"
                                                        checked={designForm.architectural_plan === true}
                                                        onChange={() =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                architectural_plan: true,
                                                            })
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="designNo"
                                                        label={t("ProjectInfoForm.no")}
                                                        name="architectural_plan"
                                                        value="No"
                                                        checked={designForm.architectural_plan === false}
                                                        onChange={() =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                architectural_plan: false,
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
                                                    {t("ProjectInfoForm.back")}
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
                                <Tab eventKey="designinfo" title={t("DesingInfoForm.title")}>
                                    <div className="personal-info-box design-info-box">
                                        <Row>
                                            <Col md={12} lg={6}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designUsageType"
                                                >
                                                    <Form.Label>
                                                        {t(
                                                            "DesingInfoForm.number_of_main_users_of_the_space"
                                                        )}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="number_of_users"
                                                        value={designForm.number_of_users}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                number_of_users: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.number_of_users && (
                                                        <small className="text-danger">
                                                            {designErrors.number_of_users}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designUserAgeRange"
                                                >
                                                    <Form.Label>
                                                        {t("DesingInfoForm.age_range_of_users")}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="age_range"
                                                        value={designForm.age_range}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                age_range: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.age_range && (
                                                        <small className="text-danger">
                                                            {designErrors.age_range}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designSpecialNotes"
                                                >
                                                    <Form.Label>
                                                        {t("DesingInfoForm.special_notes")}
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        name="special_notes"
                                                        value={designForm.special_notes}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                special_notes: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.special_notes && (
                                                        <small className="text-danger">
                                                            {designErrors.special_notes}
                                                        </small>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="designOtherNotes"
                                                >
                                                    <Form.Label>
                                                        {t("DesingInfoForm.other_notes")}
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        name="other_notes"
                                                        value={designForm.other_notes}
                                                        onChange={(e) =>
                                                            setDesignForm({
                                                                ...designForm,
                                                                other_notes: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    {designErrors.other_notes && (
                                                        <small className="text-danger">
                                                            {designErrors.other_notes}
                                                        </small>
                                                    )}
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
                                                onClick={() =>
                                                    handleNextTab("designinfo", "designtype")
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
                                        <h3 className="mb-2">{t("DesignTypeForm.design_style")}</h3>
                                        {/* <p>{t("DesignTypeForm.select_design_style")}</p> */}
                                        <div className="design-type-categories">
                                            <Row>
                                                {Object.keys(designExamples).map((style, i) => (
                                                    <Col md={6} lg={4} className="h-400" key={i}>
                                                        <div className="design-type-item">
                                                            {/*<img
                                  src={InquryDesign}
                                  alt={`${style} Design`}
                                /> */}
                                                            <img
                                                                src={designExamples[style][0]} // First image from that style
                                                                alt={`${style} Design`}
                                                                onError={(e) =>
                                                                    (e.currentTarget.src = InquryDesign)
                                                                } // fallback image
                                                            />
                                                            <div className="designtype-text">
                                                                <h4>{t(`DesignStyles.${style}`)} {t("DesignTypeForm.design")}</h4>
                                                                <Button
                                                                    className="btn-gray"
                                                                    type="button"
                                                                    onClick={() => handleOpenModal(style)}
                                                                >
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
                                                {inquiryState.loading ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    t("DesignTypeForm.submit")
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Form>
                    </div>
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
                </Tab>
                <Tab eventKey="exterior" title="Exterior Design">
                    <ExteriorForm />
                </Tab>
            </Tabs>


            {/* -------------- STYLE SELECTION MODAL -------------- */}
            < Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                className="de-chose-image"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("mdlImageShow.select_examples_for")} {selectedStyle}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        {selectedStyle &&
                            designExamples &&
                            designExamples[selectedStyle].map((example: any) => {
                                const fileName = example.split("/").pop() || "";
                                const isSelected = selectedImages.includes(example);

                                return (
                                    <div className="new-image-interior" key={example}>
                                        <div
                                            className={`example-card border rounded position-relative ${isSelected ? "border-teal shadow-sm" : "border-light"
                                                }`}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                            }}
                                            onClick={() => handleImageSelect(example)}
                                        >
                                            {/* Image */}
                                            <img
                                                src={example}
                                                alt={fileName}
                                                className="img-fluid rounded"
                                                onError={(e) => (e.currentTarget.src = InquryDesign)}
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
                                                {isSelected && "✓"}
                                            </div>

                                            {/* Image name */}
                                            <p className="mt-2 mb-0 small fw-medium d-none">
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
                        {t("mdlImageShow.selected")}: {selectedImages.length}{" "}
                        {t("mdlImageShow.image")}
                        {selectedImages.length !== 1 && "s"}
                    </div>
                    <div>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            {t("mdlImageShow.cancel")}
                        </Button>
                        <Button
                            className="btn btn-teal ms-2"
                            onClick={handleConfirmSelection}
                        >
                            {t("mdlImageShow.confirm_selection")}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default TabbingDesign

