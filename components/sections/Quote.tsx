import type { Quote as QuoteType } from "../../sanity/types";

function StepperUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8.5L7 5.5L10 8.5" stroke="#101011" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepperDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 5.5L7 8.5L10 5.5" stroke="#101011" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Radios({
  name,
  options,
}: {
  name: string;
  options?: string[];
}) {
  return (
    <div className="quote_radios">
      {options?.map((option, i) => (
        <label className="quote_radio" key={i}>
          <input type="radio" name={name} value={option} />
          <span className="quote_radio-dot"></span>
          <span className="quote_radio-label">{option}</span>
        </label>
      ))}
    </div>
  );
}

export function Quote({ data }: { data: QuoteType | null }) {
  if (!data) return null;

  const clvMin = data.clv?.min ?? 20000;

  return (
    <section className="quote">
      <div className="padding-global decor">
        <div className="quote_decor">
          <img src="/images/sections/pricing/decor-left.webp" width={392} height={2928} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="container-large">
          <div className="quote_wrapper">
            <div className="quote_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="quote_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>
            <div className="quote_text-wrap">
              <p className="text-label-x-large secondary fw-400">{data.text}</p>
            </div>

            <form
              className="quote_form"
              data-clv-min={clvMin}
              data-clv-max={data.clv?.max ?? 1000000}
              data-clv-step={data.clv?.step ?? 1000}
            >
              <div className="quote_form-top">
                <span className="quote_dot quote_dot--red"></span>
                <span className="quote_dot quote_dot--yellow"></span>
                <span className="quote_dot quote_dot--green"></span>
              </div>

              <div className="quote_form-body">
                <div className="quote_field" data-q="meetings">
                  <p className="quote_field-title">
                    <span>01.</span>
                    {data.meetings?.question}
                  </p>
                  <Radios name="quote-meetings" options={data.meetings?.options} />
                  <span className="quote_error">{data.meetings?.error}</span>
                </div>

                <div className="quote_field" data-q="budget">
                  <p className="quote_field-title">
                    <span>02.</span>
                    {data.budget?.question}
                  </p>
                  <Radios name="quote-budget" options={data.budget?.options} />
                  <span className="quote_error">{data.budget?.error}</span>
                </div>

                <div className="quote_field third" data-q="clv">
                  <p className="quote_field-title">
                    <span>03.</span>
                    {data.clv?.question}
                  </p>
                  <div className="quote_num">
                    <span className="quote_num-prefix">$</span>
                    <input
                      className="quote_num-input"
                      type="text"
                      inputMode="numeric"
                      defaultValue={clvMin.toLocaleString("en-US")}
                    />
                    <div className="quote_num-steppers">
                      <button className="quote_num-btn" type="button" data-step="up" aria-label="Increase">
                        <StepperUpIcon />
                      </button>
                      <button className="quote_num-btn" type="button" data-step="down" aria-label="Decrease">
                        <StepperDownIcon />
                      </button>
                    </div>
                  </div>
                  <span className="quote_error">{data.clv?.error}</span>
                </div>

                <div className="quote_field four">
                  <p className="quote_field-title">
                    <span>04.</span>
                    {data.closeRate?.question}
                  </p>
                  <div className="quote_range">
                    <div className="quote_range-bar">
                      <span className="quote_range-edge">0</span>
                      <input
                        className="quote_range-input"
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={data.closeRate?.initial ?? 20}
                        aria-label="Average close rate"
                      />
                      <span className="quote_range-edge">100</span>
                    </div>
                    <div className="quote_pct">
                      <span className="quote_pct-prefix">%</span>
                      <input
                        className="quote_pct-input"
                        type="text"
                        inputMode="numeric"
                        defaultValue={data.closeRate?.initial ?? 20}
                        aria-label="Average close rate percent"
                      />
                    </div>
                  </div>
                </div>

                <div className="quote_field">
                  <p className="quote_field-title">
                    <span>05.</span>
                    {data.contacts?.question}
                  </p>
                  <div className="quote_contacts">
                    <div className="quote_control">
                      <input type="text" placeholder={data.contacts?.namePlaceholder} required />
                      <span className="quote_error">{data.contacts?.nameError}</span>
                    </div>
                    <div className="quote_control">
                      <input type="email" placeholder={data.contacts?.emailPlaceholder} required />
                      <span className="quote_error">{data.contacts?.emailError}</span>
                    </div>
                    <div className="quote_control">
                      <input type="url" placeholder={data.contacts?.urlPlaceholder} required />
                      <span className="quote_error">{data.contacts?.urlError}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quote_form-bottom">
                <a className="quote_submit" href="#">
                  <span>{data.submitLabel}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.79492 11.8912H18.9212M13.6707 17.1417L18.9212 11.8912L13.6707 6.64062"
                      stroke="#101011"
                      strokeWidth="1.8"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="quote_decor right">
          <img src="/images/sections/pricing/decor-right.webp" width={392} height={2928} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
