<script lang="ts">
    import AboutHeader from "$lib/components/AboutHeader.svelte";
    import { Radar, Mail, Bug } from "lucide-svelte";
    import { SiGithub } from "@icons-pack/svelte-simple-icons";
    import FloatingCircles from "$lib/components/FloatingCircles.svelte";
</script>

<AboutHeader />
<FloatingCircles />

<main class="about-container">
    <section class="content">
        <div class="logo">
            <Radar size={70} color="#4285f4" />
        </div>

        <h1>PeerBeam</h1>
        <div class="tagline">The easiest way to share files, peer-to-peer</div>

        <div class="description">
            Securely transfer files between devices and networks. Powered by
            WebRTC for fast, direct connections
        </div>

        <div class="social-links">
            <a
                href="https://github.com/6b70/peerbeam-web"
                target="_blank"
                rel="noreferrer"
                title="PeerBeam on Github"
            >
                <SiGithub size={24} color="#666" />
            </a>
            <a
                href="https://github.com/6b70/peerbeam-web/issues/new"
                target="_blank"
                rel="noreferrer"
                title="Report a Bug"
            >
                <Bug size={24} color="#666" />
            </a>
            <a href="mailto:krish6b@icloud.com" title="Contact Me">
                <Mail size={24} color="#666" />
            </a>
        </div>
    </section>
</main>

<style>
    .about-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 600px;
        animation: fadeIn 0.5s ease-out;
    }

    .logo {
        margin-bottom: 10px;
    }

    h1 {
        font-size: 2.5rem;
        background: linear-gradient(135deg, #4285f4, #34a853);
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .tagline {
        font-size: 1.2rem;
        color: #5f6368;
        margin: 10px 0 14px 0;
    }

    .description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 5px;
    }

    .social-links {
        display: flex;
        gap: 20px;
        margin-top: 20px;
    }

    .social-links a {
        width: 40px;
        height: 40px;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
