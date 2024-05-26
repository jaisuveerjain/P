import { Border, FadeIn, FadeInStagger } from '@/components';
import clsx from 'clsx';
import { default as Image } from 'next/image';

const experience = [
  {
    title: 'Tecnotree(MTN Nigeria) | Application Developer.',
    date: 'Jul 2022 - Sep 2023',
    description: [
      'Futuristic Employee Award: Year 2023.',
      'REST API Development | Open Source and TM Forum Standards.',
      'Digital BSS Suite Transformation from a Legacy Stack.',
      'Front End Development JavaScript, Angular and React Frameworks.',
      'Data Migration from Oracle SQL to MongoDB.',
      'Access and Identity Management | WSO2 Identity Management System'
    ],
    image: { url: '/work/TT-MTN.jpg', height: 67, width: 140, className: 'rounded-none' },
  },
  {
    title: 'Tecnotree Convergence Pvt Ltd | Software Engineer.',
    date: 'Jan 2021 - Jun 2022',
    description: [
      'Dynamic API Creation and Development.',
      'Apache Kafka and Grafana, Automated Test Scripts.',
      'Integration in CRM applications with Third party softwares.',
      'Jenkins Pipelines and Access Management: Linux, Rancher, Kubernetes, AWS.',
      'Automation Performance and Load Testing: Java Selenium, Python,Robo3T, Apache Jmeter.'
    ],
    image: { url: '/work/tecnotree.jpg', height: 100, width: 100, className: '' },
  },
  {
    title: 'BYJUS | Business Development Analyst | Apprenticeship.',
    date: 'Sep 2020 - Dec 2020',
    description: [
      'Involved in Marketing, Sales and Promotions of EdTech Related Software Products.',
      'Business Development and Analysis.',
      'Product Pitching and Sales, Marketing Online Products.',
    ],
    image: { url: '/work/Byjus.png', height: 96, width: 96, className: '' },
  },
  {
    title: 'TechCentrix | Intern.',
    date: 'Jun 2019 - Aug 2019',
    description: [
      'Effectively Created Responsive Websites Using Bootstrap Framework.',
      'Web Applications migrated using Bootstrap made compatible for viewing on Mobile Browsers.',
      'HTML, CSS, JavaScript, Bootstrap.'
    ],
    image: { url: '/work/techcentrix.jpg', height: 94, width: 94, className: 'bg-white' },
  },
];

export default function WorkExperience() {
  return (
    <div className="mt-24 text-gray-500 relative z-10 @container">
      <FadeIn
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        viewportProp={{ once: true }}
      >
        <div className="border-l border-gray-500/30 absolute bottom-0 top-0"></div>
      </FadeIn>
      <FadeInStagger>
        {experience.map((item, index) => (
          <WorkRole key={index} title={item.title} date={item.date} image={item.image}>
            {item.description.map((desc, index) => (
              <li key={index} className="py-1">
                {desc}
              </li>
            ))}
          </WorkRole>
        ))}
      </FadeInStagger>
    </div>
  );
}

function WorkRole({ children, title, date, image }: { children: React.ReactNode; title: string; date?: string; image: { url: string; className: string; height: number; width: number } }) {
  return (
    <FadeIn className="flex group mt-8 first:mt-0 px-3">
      <div className="hidden @lg:flex @lg:flex-col">
        <p className="px-4 pt-8 group-first:pt-0 text-white text-sm leading-7 min-w-[180px] max-w-[180px] @lg:min-w-[195px] @lg:max-w-[195px] @xl:max-w-[215px] @xl:min-w-[215px] flex-none">{date}</p>
        <div className={clsx('flex-none rounded-md overflow-hidden self-center mx-4 mt-auto mb-auto', image.className)}>
          <Image
            src={image.url}
            alt=""
            height={image.height}
            width={image.width}
            style={{
              width: image.width || 'auto',
              height: image.height || 'auto',
            }}
          />
        </div>
      </div>
      <Border className="pt-8 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
        <div className="flex mb-4">
          <div className={clsx('flex-none rounded-md overflow-hidden self-center ml-2 mr-4 @lg:hidden', image.className)}>
            <Image
              src={image.url}
              alt=""
              height={image.height}
              width={image.width}
              style={{
                width: image.width || 'auto',
                height: image.height || 'auto',
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-work_experience_orange text-lg">{title}</p>
            <p className="@lg:hidden mt-2 text-white text-sm">{date}</p>
          </div>
        </div>
        <ul className="list-disc pl-10">{children}</ul>
      </Border>
    </FadeIn>
  );
}
