import { Link } from "react-router";

import { IoIosArrowRoundDown } from "react-icons/io";

function Home() {
  return (
    <>
      <section className="hero text-background relative">
        <div className="relative flex h-full w-4/5 flex-col items-center justify-center">
          <h1 className="font-main text-3xl font-black lg:text-5xl lg:leading-14">
            Manage. Track. Resolve.
            <br />
            <span className="font-semibold"> All in One Place.</span>
          </h1>
          <p className="pt-3 pb-10 font-medium lg:max-w-[60%]">
            Faaji Sticks is your all-in-one ticket management web app — helping
            you create, view, and resolve tickets effortlessly. Stay organized,
            efficient, and in control.
          </p>
          <Link
            className="bg-accent hover:bg-primary-dark rounded-full px-3 py-2 font-semibold text-white lg:px-5"
            to="sign-up"
          >
            Get Started
          </Link>

          <p className="absolute bottom-20 flex items-center justify-center text-xs">
            <IoIosArrowRoundDown size={20} />
            <span className="opacity-60">Explore More</span>
          </p>
        </div>

        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
      </section>

      {/* Features */}
      <section class="features">
        <div class="decorative-circle circle-3"></div>
        <div class="decorative-circle circle-4"></div>
        <h2>Why Choose Faaji Sticks?</h2>
        <p class="subtitle">
          Powerful, intuitive, and secure — everything you need to manage
          tickets with ease.
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="icon">🎫</div>
            <h3>Create & Manage Tickets</h3>
            <p>
              Easily create, view, and edit tickets in one simple interface.
              Keep track of progress and updates in real time.
            </p>
          </div>

          <div class="feature-card">
            <div class="icon">🔒</div>
            <h3>Secure Authentication</h3>
            <p>
              Simulated login system using localStorage and session tokens to
              keep your data protected and private.
            </p>
          </div>

          <div class="feature-card">
            <div class="icon">📊</div>
            <h3>Insightful Dashboard</h3>
            <p>
              Get a clear overview of open, in-progress, and closed tickets.
              Make data-driven decisions effortlessly.
            </p>
          </div>

          <div class="feature-card">
            <div class="icon">⚙️</div>
            <h3>Responsive Design</h3>
            <p>
              Optimized for all devices — from mobile to desktop. Enjoy a smooth
              experience anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section class="how-it-works">
        <div class="container">
          <div class="text-content">
            <h2>How Faaji Sticks Works</h2>
            <p class="intro">
              From login to ticket resolution — everything happens in one sleek,
              responsive interface. Here’s how you stay in control:
            </p>

            <ul class="steps">
              <li>
                <span class="step-icon">🔑</span>
                <div>
                  <h3>1. Login Securely</h3>
                  <p>
                    Sign in using your registered credentials and start managing
                    your tickets instantly.
                  </p>
                </div>
              </li>

              <li>
                <span class="step-icon">🧾</span>
                <div>
                  <h3>2. Create New Tickets</h3>
                  <p>
                    Log new issues or requests with a simple form. Every ticket
                    gets its own ID for easy tracking.
                  </p>
                </div>
              </li>

              <li>
                <span class="step-icon">📊</span>
                <div>
                  <h3>3. Track Progress</h3>
                  <p>
                    Monitor open, in-progress, and closed tickets directly from
                    your dashboard — all in real time.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="image-content">
            <img
              src="/dashboard-preview.png"
              alt="Faaji Sticks Dashboard Preview"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
