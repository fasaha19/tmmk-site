import { Card } from "@/components/card.component";
import { Layout } from "@/components/layout.component";

const Event = () => {
  return (
    <>
      <Layout>
        {/* video */}
        <section className="mt-16">
          <h1>TMMK Events</h1>
          <div className="grid grid-auto-fit-xs gap-16">
            {/* <Card />
            <Card />
            <Card /> */}
          </div>
        </section>

        <section className="mt-16">
          <img
            className="object-cover shadow-md object-center rounded w-full h-[22rem]"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </section>

        <section className="mt-16">
          <h1 className="text-center">Brief Content</h1>
          <div className="grid gap-12 grid-auto-fit mt-8">
            <div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                id temporibus voluptatibus vitae consequuntur laboriosam
                assumenda odit dolorum! Praesentium dolorem, dolorum, deleniti
                explicabo blanditiis tempora deserunt, quisquam ipsum facere
                numquam iste optio voluptatibus odit! Fuga vitae quos laboriosam
                minus,
              </p>
              <p className="mt-8">
                quibusdam incidunt quo deleniti, deserunt esse, dolorum nobis
                magni eius maiores! Veritatis assumenda minus ex laudantium
                officia expedita sed animi alias odio doloribus fuga accusantium
                aliquam minima quisquam vel totam earum perferendis sit,
                obcaecati fugiat, rem laboriosam dolorum dignissimos.
              </p>
            </div>
            <div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                id temporibus voluptatibus vitae consequuntur laboriosam
                assumenda.
              </p>
              <p className="mt-8">
                quibusdam incidunt quo deleniti, deserunt esse, dolorum nobis
                magni eius maiores! Veritatis assumenda minus ex laudantium
                officia expedita sed animi alias odio doloribus fuga accusantium
                aliquam minima quisquam vel totam earum perferendis sit,
                obcaecati fugiat, rem laboriosam dolorum dignissimos. Quos fuga,
                sunt cupiditate quod recusandae fugit sequi dolorum voluptate
                laudantium ducimus.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Event;
