import { Card, Carousel, Progress, Tag } from "antd";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import { formatVnd } from "../../utils/format";
import "./styles.scss";

function clampPercent(value) {
  const n = typeof value === "number" ? value : Number(value ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function CampaignCard({ campaign }) {
  const goal = Number(campaign.goal ?? 0);
  const raised = Number(campaign.raised ?? 0);
  const percent = clampPercent(goal > 0 ? (raised / goal) * 100 : 0);

  return (
    <div className="campaign-list__slide">
      <Card className="campaign-card" bordered>
        <div className="campaign-card__cover">
          {campaign.image ? (
            <img
              className="campaign-card__img"
              src={campaign.image}
              alt={campaign.title}
              loading="lazy"
            />
          ) : (
            <div className="campaign-card__placeholder" aria-hidden="true">
              <FiImage size={44} />
            </div>
          )}
        </div>
        <Tag className="campaign-card__tag" color="lime">
          {campaign.daysLeft} ngày
        </Tag>

        <div className="campaign-card__body">
          <div className="campaign-card__title">{campaign.title}</div>
          <Progress
            className="campaign-card__progress"
            percent={percent}
            showInfo={false}
            strokeColor="#ff4d4f"
            trailColor="rgba(0,0,0,0.08)"
            strokeLinecap="round"
          />

          <div className="campaign-card__meta">
            <span>
              Đạt{" "}
              <span className="campaign-card__money">{formatVnd(raised)}</span>{" "}
              / {formatVnd(goal)}
            </span>
            <span className="campaign-card__percent">
              {Math.round(percent)}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function CampaignList({
  campaigns,
  fullBleed = true,
  maxWidth = 1400,
  title = "Chiến dịch nổi bật",
  action,
}) {
  const carouselRef = useRef(null);
  const data =
    campaigns?.length > 0
      ? campaigns
      : [
          {
            id: 1,
            title: "Giảm thiệt hại thiên tai miền Trung",
            daysLeft: 5,
            raised: 750000000,
            goal: 1000000000,
            image: null,
          },
          {
            id: 2,
            title: "Xây trường cho trẻ em vùng cao",
            daysLeft: 3,
            raised: 350000000,
            goal: 1000000000,
            image: null,
          },
          {
            id: 3,
            title: "Hội người khuyết tật Đà Nẵng",
            daysLeft: 4,
            raised: 750000000,
            goal: 1000000000,
            image: null,
          },
          {
            id: 4,
            title: "Gây quỹ bữa ăn cho trẻ em khó khăn",
            daysLeft: 6,
            raised: 120000000,
            goal: 300000000,
            image: null,
          },
        ];

  return (
    <section
      className={`campaign-list${fullBleed ? " full-bleed" : ""}`}
      style={{
        "--campaign-list-max":
          typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }}
    >
      <div className="campaign-list__inner">
        {title ? (
          <div className="campaign-list__header">
            <h2 className="campaign-list__title">{title}</h2>
            {action ? (
              <div className="campaign-list__action">{action}</div>
            ) : null}
          </div>
        ) : null}

        <div className="campaign-list__carousel-wrap">
          <Carousel
            ref={carouselRef}
            className="campaign-list__carousel"
            dots={false}
            infinite={false}
            draggable
            slidesToShow={3}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {data.map((c) => (
              <CampaignCard key={c.id ?? c.title} campaign={c} />
            ))}
          </Carousel>

          <button
            type="button"
            className="campaign-list__nav campaign-list__nav--prev"
            onClick={() => carouselRef.current?.prev?.()}
            aria-label="Trước"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="campaign-list__nav campaign-list__nav--next"
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
