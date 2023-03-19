import { Layout } from "@/components/layout.component";

const PressRelease = () => {
  return (
    <Layout>
      <section className="mt-16">
        <img
          className="object-cover shadow-lg object-center rounded w-full h-[25rem]"
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
      </section>
      <section className="mt-16 ">
        <h1 className="text-center">Press release</h1>
        <div className="grid grid-auto-fit gap-6 mt-8">
          <section className="text-grey-50 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="-my-8 divide-y-2 divide-gray-200">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-32 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="mt-1 text-gray-500 text-sm">
                      12 Jun 2019
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-black title-font mb-2">
                      Bitters hashtag waistcoat fashion axe chia unicorn
                    </h2>
                    <p className="leading-relaxed">
                      Glossier echo park pug, church-key sartorial biodiesel
                      vexillologist pop-up snackwave ramps cornhole. Marfa 3
                      wolf moon party messenger bag selfies, poke vaporware
                      kombucha belly polaroid hoodie portland craft beer.
                    </p>
                    <a className="text-indigo-400 inline-flex items-center mt-4">
                      see more
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
                  <div className="md:w-32 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="mt-1 text-gray-500 text-sm">
                      12 Jun 2019
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-black title-font mb-2">
                      Meditation bushwick direct trade taxidermy shaman
                    </h2>
                    <p className="leading-relaxed">
                      Glossier echo park pug, church-key sartorial biodiesel
                      vexillologist pop-up snackwave ramps cornhole. Marfa 3
                      wolf moon party messenger bag selfies, poke vaporware
                      kombucha belly polaroid hoodie portland craft beer.
                    </p>
                    <a className="text-indigo-400 inline-flex items-center mt-4">
                      see more
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
                  <div className="md:w-32 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="mt-1 text-gray-500 text-sm">
                      12 Jun 2019
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-black title-font mb-2">
                      Woke master cleanse drinking vinegar salvia
                    </h2>
                    <p className="leading-relaxed">
                      Glossier echo park pug, church-key sartorial biodiesel
                      vexillologist pop-up snackwave ramps cornhole. Marfa 3
                      wolf moon party messenger bag selfies, poke vaporware
                      kombucha belly polaroid hoodie portland craft beer.
                    </p>
                    <a className="text-indigo-400 inline-flex items-center mt-4">
                      see more
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-200 h-full">
            <iframe
              src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              className="grid place-content-center h-full w-full"
            ></iframe>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default PressRelease;
