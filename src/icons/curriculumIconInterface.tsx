export default function CurriculumIcon({ isHovered }: { isHovered?: boolean }) {
    return (
      <div>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            fill={isHovered ? "#FFFFFF" : "#0B486B"}
          >
            <path d="M40 120 l0 -100 55 0 55 0 0 40 c0 36 3 40 25 40 24 0 25 3 25 60 l0 60 -80 0 -80 0 0 -100z m76 59 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33 5 0 12 -5 16 -11z m12 -56 c2 -9 -7 -13 -27 -13 -30 0 -39 9 -24 24 11 10 46 3 51 -11z" />
            <path d="M170 70 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" />
            <path d="M170 40 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" />
            <path d="M170 10 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" />
          </g>
        </svg>
      </div>
    );
  }
  