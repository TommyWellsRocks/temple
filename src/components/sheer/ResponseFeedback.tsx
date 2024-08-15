function LossText() {
  return (
    <div className="flex flex-col gap-y-14 text-base">
      <div className="flex flex-col">
        <span>All your invested momentum... gone.</span>
        <span>Likely some self-confidence with it.</span>
        <span>
          <span className="italic">This sucks...</span> no ignoring it...
        </span>
      </div>

      <div className="flex flex-col gap-y-2">
        <span>Luckily, tomorrow is a new day.</span>
        <span>Learn from this lesson and move forward.</span>
        <span>
          Listen to the wisdom of your spirit, not the desires of the flesh.
        </span>
        <span>Don&apos;t trade the long term for the short term.</span>
        <span>
          And remember, there is hope... You get to choose what you will next.
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <video
          src={`content/videos/sheer/rocky.mp4`}
          controls
          controlsList="nodownload"
          autoPlay
          className="mx-auto rounded-md min-[900px]:w-2/3"
        >
          Your browser does not support this video {" :("}. That&apos;s too bad!
          It&apos;s a really good video!
        </video>

        <span className="flex flex-col gap-1 italic">
          “Let me tell you something you already know. The world ain&apos;t all
          sunshine and rainbows. It&apos;s a very mean and nasty place and I
          don&apos;t care how tough you are it will beat you to your knees and
          keep you there permanently if you let it. You, me, or nobody is gonna
          hit as hard as life. But it ain&apos;t about how hard ya hit.
          It&apos;s about how hard you can get it and keep moving forward. How
          much you can take and keep moving forward. That&apos;s how winning is
          done! Now if you know what you&apos;re worth then go out and get what
          you&apos;re worth. But ya gotta be willing to take the hits, and not
          pointing fingers saying you ain&apos;t where you wanna be because of
          him, or her, or anybody! Cowards do that and that ain&apos;t you!
          You&apos;re better than that!”
          <span>~ Rocky</span>
        </span>
      </div>
    </div>
  );
}

function WinText({ winStreak }: { winStreak: number }) {
  return (
    <div className="flex flex-col gap-y-14 text-base">
      <div className="flex flex-col gap-y-2">
        <span>Respect+</span>
        <span>Momentum+</span>
        <span>Confidence+</span>
      </div>

      <div className="flex flex-col gap-y-2 text-xl font-bold">
        <span>
          Your winstreak: {winStreak} {winStreak === 1 ? "Day" : "Days"}{" "}
        </span>
        {winStreak > 0 && winStreak <= 13 ? (
          <span>WHAT&apos;CHU GOT?? YOU GONNA GIVE UP?? 👅🤭👺</span>
        ) : null}
        {winStreak >= 14 && winStreak <= 29 ? (
          <span>
            INTERESTING... ARE YOU <span className="italic">REALLY</span>{" "}
            SERIOUS?? 🤨🤨
          </span>
        ) : null}
        {winStreak >= 30 && winStreak <= 59 ? (
          <span>OH BABY, NOW YOU&apos;RE COOKING!! 🎉🎉👏👏</span>
        ) : null}
        {winStreak >= 60 && winStreak <= 89 ? (
          <span>MAD RESPECT!! LEGEND IN THE MAKING!! 🏆🥇🫡</span>
        ) : null}
        {winStreak >= 90 ? (
          <span>MAKE WAY!! COMPLETE TRANSFORMATION OVER HERE!! 🫡🥂🎉👏</span>
        ) : null}
      </div>
    </div>
  );
}

export function ResponseFeedBack({
  response,
  winStreak,
}: {
  response: boolean;
  winStreak: number;
}) {
  return (
    <section className="mx-auto space-y-5">
      <span>{response === true ? "THAT'A BOY!" : "😞"}</span>
      <video
        src={`content/videos/sheer/${response === true ? "proud" : "sad"}.mp4`}
        loop
        muted
        autoPlay
        className="mx-auto"
      >
        Your browser does not support this video {" :("}. That&apos;s too bad!
        It&apos;s a really good video!
      </video>

      {response === true ? <WinText winStreak={winStreak} /> : <LossText />}
    </section>
  );
}
