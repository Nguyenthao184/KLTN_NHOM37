import { Button, Card, Carousel } from "antd";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import { formatVnd } from "../../utils/format";
import "./styles.scss";

function OrganizationCard({ organization }) {
  return (
    <div className="org-list__slide">
      <Card className="org-card" bordered>
        <div className="org-card__avatar">
          {organization.logo ? (
            <img
              className="org-card__avatar-img"
              src={organization.logo}
              alt={organization.name}
              loading="lazy"
            />
          ) : (
            <div className="org-card__avatar-placeholder" aria-hidden="true">
              <FiImage size={34} />
            </div>
          )}
        </div>

        <div className="org-card__body">
          <div className="org-card__name">{organization.name}</div>

          <div className="org-card__meta">
            <div>
              Tài khoản thiện nguyện số:{" "}
              <span className="org-card__strong">
                {organization.accountNumber}
              </span>
            </div>
            <div>
              Số tiền gây quỹ:{" "}
              <span className="org-card__strong">
                {formatVnd(organization.totalRaised)}
              </span>
            </div>
            <div>
              Tham gia từ:{" "}
              <span className="org-card__strong">{organization.joinedAt}</span>
            </div>
            <div>
              Khu vực:{" "}
              <span className="org-card__strong">{organization.region}</span>
            </div>
          </div>

          <div className="org-card__actions">
            <Button type="primary" className="org-card__btn">
              QUAN TÂM
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function OrganizationList({
  organizations,
  fullBleed = true,
  maxWidth = 1400,
  title = "Tổ chức nổi bật",
  action,
}) {
  const carouselRef = useRef(null);
  const data =
    organizations?.length > 0
      ? organizations
      : [
          {
            id: 1,
            name: "HỘI CHỮ THẬP ĐỎ VIỆT NAM",
            accountNumber: 1024,
            totalRaised: 1782452000,
            joinedAt: "03/2024",
            region: "Đà Nẵng",
            logo: null,
          },
          {
            id: 2,
            name: "MẶT TRẬN TỔ QUỐC VIỆT NAM",
            accountNumber: 1024,
            totalRaised: 1782452000,
            joinedAt: "03/2024",
            region: "Đà Nẵng",
            logo: null,
          },
          {
            id: 3,
            name: "THỊNH PHÁT GROUP",
            accountNumber: 1024,
            totalRaised: 1782452000,
            joinedAt: "03/2024",
            region: "Đà Nẵng",
            logo: null,
          },
          {
            id: 4,
            name: "QUỸ TRẺ EM VIỆT NAM",
            accountNumber: 1024,
            totalRaised: 540000000,
            joinedAt: "11/2023",
            region: "Hà Nội",
            logo: null,
          },
        ];

  return (
    <section
      className={`org-list${fullBleed ? " full-bleed" : ""}`}
      style={{
        "--org-list-max":
          typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }}
    >
      <div className="org-list__inner">
        {title ? (
          <div className="org-list__header">
            <h2 className="org-list__title">{title}</h2>
            {action ? <div className="org-list__action">{action}</div> : null}
          </div>
        ) : null}

        <div className="org-list__carousel-wrap">
          <Carousel
            ref={carouselRef}
            className="org-list__carousel"
            dots={false}
            infinite={false}
            draggable
            slidesToShow={3}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {data.map((o) => (
              <OrganizationCard key={o.id ?? o.name} organization={o} />
            ))}
          </Carousel>

          <button
            type="button"
            className="org-list__nav org-list__nav--prev"
            onClick={() => carouselRef.current?.prev?.()}
            aria-label="Trước"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="org-list__nav org-list__nav--next"
            onClick={() => carouselRef.current?.next?.()}
            aria-label="Sau"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
