import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchNumberBanner } from "../../../redux/slice/homepage/numberBannerSlice";
import type { AppDispatch } from "../../../redux/store";
import type { RootState } from "../../../redux/store";

const Dream: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading } = useSelector(
    (state: RootState) => state.numberBanner
  );

  useEffect(() => {
    dispatch(fetchNumberBanner());
  }, [dispatch]);

  if (loading) return null;

  return (
    <section className="dream">
      <div className="dream-image">
        <img
          src={data?.image_url}
          alt="Dream Banner"
          loading="lazy"
        />
      </div>

      <div className="dream-text">
        <h3 data-aos="fade-up">
          {i18n.language === "ar" ? data?.title_ar : data?.title_en}
        </h3>
      </div>
    </section>
  );
};

export default Dream;
